const Practice = require("../models/Practice")
const mongoose = require("mongoose")
const mongod = require("mongodb")
const User = require("../models/User")

// get all available topics
const getAllTopics = async (req, res) => {
  try {
    const data = await Practice.aggregate([
      {
        $project: {
          name: 1,
          icon: 1,
          total_questions: { $size: "$questions" },
        },
      },
    ])

    return res.status(200).json({
      error: false,
      data: data,
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

// create practice attempt
const createPracticeAttempt = async (req, res) => {
  let { topic_id, size } = req.body
  size = Number(size)

  // check for topic id in request body
  if (topic_id === undefined) {
    return res.status(400).json({
      error: true,
      message: "Send a topic id",
    })
  }

  // validate mongo id
  if (!mongoose.Types.ObjectId.isValid(topic_id)) {
    return res.status(400).json({
      error: true,
      message: "Invalid topic id",
    })
  }

  // if no size in response or size not a number set default
  if (!size) {
    size = 5
  }

  try {
    const get_questions = await Practice.aggregate([
      {
        //  match topic_id
        $match: { _id: mongod.ObjectID(topic_id) },
      },
      {
        // opening array so every question becomes a separate document
        $unwind: "$questions",
      },
      {
        // randomly select required no. of question
        $sample: { size: size },
      },
      {
        // create response containing ony question_id
        $project: {
          question_ids: "$questions._id",
          _id: 0,
        },
      },
    ])

    // if result is empty
    if (get_questions.length === 0) {
      return res.status(400).json({
        error: true,
        message: "No such topic id",
      })
    }

    // form array of question id
    const question_ids = get_questions.map((obj) => {
      return obj.question_ids
    })

    return res.status(200).json({
      error: false,
      questions: question_ids,
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

// get the question when question id is passed
const getQuestion = async (req, res) => {
  const user_id = req.id
  const { question_id, topic_id } = req.body

  // check for topic id and question id
  if (question_id === undefined || topic_id === undefined) {
    return res.status(400).json({
      error: true,
      message: "Send both topic and question id",
    })
  }

  // validate mongo id
  if (
    !mongoose.Types.ObjectId.isValid(topic_id) ||
    !mongoose.Types.ObjectId.isValid(question_id)
  ) {
    return res.status(400).json({
      error: true,
      message: "Invalid topic or question id",
    })
  }

  try {
    const get_question = await Practice.findOne(
      {
        // match the topic id and question id
        _id: topic_id,
        "questions._id": question_id,
      },
      {
        // get only the matched data
        "questions.$": 1,
        _id: 0,
      }
    )
      .lean()
      .exec()

    // if result is empty
    if (get_question === null) {
      return res.status(400).json({
        error: true,
        message: "No such topic or question id",
      })
    }
    const question = get_question.questions[0]

    // check if user has bookmarked and liked the question
    const user_bookmarks_likes = await User.findOne(
      {
        _id: user_id,
      },
      {
        _id: 0,
        bookmarks: 1,
        likes: 1,
      }
    )
      .lean()
      .exec()

    // to avoid error because of user schema changes (checking whether the user schema has bookmarks and likes)
    let bookmark_flag = false
    let like_flag = false
    if (user_bookmarks_likes.bookmarks) {
      bookmark_flag =
        user_bookmarks_likes.bookmarks[question_id] !== undefined ? true : false
    }
    if (user_bookmarks_likes.likes) {
      like_flag =
        user_bookmarks_likes.likes[question_id] !== undefined ? true : false
    }

    const response_to_send = {
      question_id: question._id,
      source: question.source,
      statement: question.statement,
      explanation:
        question.explanation === undefined ? "N/A" : question.explanation,
      answer: question.answer,
      likes: question.likes,
      like_flag: like_flag,
      bookmark_flag: bookmark_flag,
    }

    return res.status(200).json({
      error: false,
      data: response_to_send,
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

// bookmarking feature
const bookmarking = async (req, res) => {
  const user_id = req.id
  const { question_id } = req.body

  // check for question id
  if (question_id === undefined) {
    return res.status(400).json({
      error: true,
      message: "Send a question id",
    })
  }

  // validate mongo id
  if (!mongoose.Types.ObjectId.isValid(question_id)) {
    return res.status(400).json({
      error: true,
      message: "Invalid question id",
    })
  }

  try {
    // check if such question is present
    let question_check = await Practice.findOne(
      {
        "questions._id": question_id,
      },
      {
        _id: 1,
      }
    )
      .lean()
      .exec()

    // if no such question present
    if (question_check === null) {
      return res.status(400).json({
        error: true,
        message: "No such question id",
      })
    }

    // get topic id
    const topic_id = question_check._id

    // get the user document
    const user_document = await User.findOne({
      _id: user_id,
    }).exec()

    // to avoid error due to user schema changes
    if (user_document.bookmarks === undefined) {
      user_document.bookmarks = {}
    }

    // add or remove the question from bookmark
    if (user_document.bookmarks[question_id] === undefined) {
      user_document.bookmarks[question_id] = [question_id, topic_id]
    } else {
      delete user_document.bookmarks[question_id]
    }

    // update in db
    await User.updateOne(
      {
        _id: user_id,
      },
      {
        bookmarks: user_document.bookmarks,
      }
    )

    return res.status(200).json({
      error: false,
      message: "Action successful",
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

// like feature
const liking = async (req, res) => {
  const user_id = req.id
  const { question_id } = req.body

  // check for question id
  if (question_id === undefined) {
    return res.status(400).json({
      error: true,
      message: "Send a question id",
    })
  }

  // validate mongo id
  if (!mongoose.Types.ObjectId.isValid(question_id)) {
    return res.status(400).json({
      error: true,
      message: "Invalid question id",
    })
  }

  try {
    // get the user document
    const user_document = await User.findOne({
      _id: user_id,
    }).exec()

    // to avoid error due to user schema changes
    if (user_document.likes === undefined) {
      user_document.likes = {}
    }

    // assume that user haven't liked the question previously
    let prev_like_flag = false
    // add or remove the question from likes
    if (user_document.likes[question_id] === undefined) {
      user_document.likes[question_id] = question_id
    } else {
      // update assumption
      prev_like_flag = true
      delete user_document.likes[question_id]
    }

    // decide whether to inc or dec like count and update in db
    let inc_or_dec = prev_like_flag === true ? -1 : 1
    let updated = await Practice.updateOne(
      {
        // match the question id
        "questions._id": question_id,
      },
      {
        // increase or decrease the count
        $inc: {
          "questions.$.likes": inc_or_dec,
        },
      }
    )

    // if no such question is present
    if (updated.nModified === 0) {
      return res.status(400).json({
        error: true,
        message: "No such question id",
      })
    }

    // update the likes in user collection only if the question is present
    await User.updateOne(
      {
        _id: user_id,
      },
      {
        likes: user_document.likes,
      }
    )

    return res.status(200).json({
      error: false,
      message: "Action successful",
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

module.exports = {
  getAllTopics,
  createPracticeAttempt,
  getQuestion,
  bookmarking,
  liking,
}
