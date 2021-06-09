const User = require("../models/User")
const mongo = require("mongodb")
const Practice = require("../models/Practice")
const mongoose = require("mongoose")

const getAllBookmarks = async (req, res) => {
  const user_id = req.id

  try {
    // get users bookmarks
    const user_bookmarks = await User.findOne(
      { _id: user_id },
      { bookmarks: 1, _id: 0 }
    )
      .lean()
      .exec()

    // get the bookmark ids
    let user_bookmarks_id = []
    if (user_bookmarks.bookmarks) {
      user_bookmarks_id = Object.values(user_bookmarks.bookmarks)
    }

    // if no bookmarks
    if (user_bookmarks_id.length === 0) {
      return res.status(200).json({
        error: false,
        data: null,
      })
    }

    // separate topic wise
    const topic_wise = {}
    user_bookmarks_id.forEach((item) => {
      if (topic_wise[item[1]] === undefined) {
        topic_wise[item[1]] = 1
      } else {
        topic_wise[item[1]] += 1
      }
    })
    // get topic id in array
    const topics = Object.keys(topic_wise)

    // get the name and icon
    let topic_details = await Practice.find(
      {
        _id: {
          $in: topics,
        },
      },
      {
        name: 1,
        icon: 1,
      }
    )
      .lean()
      .exec()

    // add count of bookmarks to response
    topic_details = topic_details.map((topic) => {
      topic.total_bookmarks = topic_wise[topic._id]
      return topic
    })

    return res.status(200).json({
      error: false,
      data: topic_details,
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      reason: `${error}`,
    })
  }
}

const getBookmarksDetailsTopicwise = async (req, res) => {
  const user_id = req.id
  const { topic_id } = req.body

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

  try {
    // get users bookmarks
    const user_bookmarks = await User.findOne(
      { _id: user_id },
      { bookmarks: 1, _id: 0 }
    )
      .lean()
      .exec()

    // get the bookmark details (array)
    let user_bookmarks_id = []
    if (user_bookmarks.bookmarks) {
      user_bookmarks_id = Object.values(user_bookmarks.bookmarks)
    }

    // if no bookmarks
    if (user_bookmarks_id.length === 0) {
      return res.status(200).json({
        error: false,
        data: null,
      })
    }

    // filter  typecast to mongo id type
    user_bookmarks_id = user_bookmarks_id.map((item) => {
      return mongo.ObjectID(item[0])
    })

    // get the bookmarked question data
    const bookmark_data = await Practice.aggregate([
      {
        $match: {
          _id: mongo.ObjectID(topic_id),
        },
      },
      {
        $unwind: "$questions",
      },
      {
        $match: {
          "questions._id": {
            $in: user_bookmarks_id,
          },
        },
      },
      {
        $project: {
          name: "$name",
          icon: "$icon",
          statement: "$questions.statement",
          question_id: "$questions._id",
          _id: 0,
        },
      },
    ])

    // if no bookmarks
    if (bookmark_data.length === 0) {
      return res.status(200).json({
        error: false,
        data: null,
      })
    }

    // store topic name and icon data
    const name = bookmark_data[0].name
    const icon = bookmark_data[0].icon
    // remove icon from all document
    bookmarks_data = bookmark_data.map((item) => {
      delete item.name
      delete item.icon
      return item
    })

    const response = {
      topic_id,
      name,
      icon,
      total_bookmarks: bookmark_data.length,
      bookmark_details: bookmark_data,
    }

    return res.status(200).json({
      error: false,
      data: response,
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
  getAllBookmarks,
  getBookmarksDetailsTopicwise,
}
