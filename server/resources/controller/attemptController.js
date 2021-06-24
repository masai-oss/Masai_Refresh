const Submission = require("../models/Submission");
const Topic = require("../models/Topic");
const OutcomeEnum = require("../utils/enums/OutcomeEnum");
const QuestionTypeEnum = require("../utils/enums/QuestionTypeEnum");
const TopicsEnum = require("../utils/enums/TopicsEnum");
const mongod = require("mongodb");
const {
  attemptValidation,
  recordAnswerValidation,
} = require("../utils/validation/attemptValidation");

const createAttempt = async (req, res) => {
  let { id: user_id } = req;
  let { size, topic_id } = req.body;
  if (!size) {
    size = 5;
  }
  if (!topic_id) {
    return res.status(400).json({
      error: true,
      message: "Pass Topic ID",
    });
  }
  try {
    let choosenQuestion = await Topic.aggregate([
      {
        $match: {
          _id: mongod.ObjectID(topic_id),
        },
      },
      {
        $unwind: "$questions",
      },
      {
        $match: {"questions.disabled" : false}
      },
      {
        $sample: {
          size: size,
        },
      },
      {
        $project: {
          question_id: "$questions._id",
          type: "$questions.type",
          _id: 0,
        },
      },
    ]);

    if (choosenQuestion.length === 0) {
      throw "The topic ID did not match";
    }
    let questions = choosenQuestion.map((el) => el.question_id);
    let doc = await Submission.findOneAndUpdate(
      { topic_id, user_id },
      {
        $push: {
          attempts: { questions, answers: choosenQuestion },
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).exec();
    let crnAttempt = doc.attempts[doc.attempts.length - 1];
    let created = {
      submission_id: doc._id,
      attempt_id: crnAttempt._id,
      questions: crnAttempt.questions,
    };
    return res.status(200).json({
      error: false,
      data: created,
    });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

const getAttemptQuestion = async (req, res) => {
  let { attempt_id, submission_id, question_id } = req.query;
  const { error } = attemptValidation(req.query);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.details[0].message,
    });
  }
  try {
    let attempt_question = await get_attempt_answer(
      submission_id,
      attempt_id,
      question_id
    );
    if (!attempt_question) {
      throw new Error("The question or the quiz does not exist.");
    }

    let topic = await Topic.findOne(
      {
        "questions._id": question_id,
      },
      {
        questions: {
          $elemMatch: {
            _id: question_id,
          },
        },
      }
    );
    let topic_question = topic.questions[0];
    let question_to_send = get_question_to_send(topic_question);

    let data = {
      ...question_to_send,
      isStatsUpdated: attempt_question.isStatsUpdated,
      response: attempt_question.response,
      selected: attempt_question.selected,
      decision: attempt_question.decision,
    };

    res.status(200).json({ error: false, data });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

const recordAttempt = async (req, res) => {
  let {
    attempt_id,
    submission_id,
    question_id,
    answer_type,
    response,
    selected,
    decision,
  } = req.body;
  const { error } = recordAnswerValidation(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      err: error.details[0].message,
    });
  }
  try {
    let answer =
      answer_type === QuestionTypeEnum.SHORT
        ? response
        : answer_type === QuestionTypeEnum.TF
        ? decision
        : selected;
    await update_submission(
      submission_id,
      attempt_id,
      question_id,
      answer_type,
      answer
    );

    res.status(200).json({ error: false, message: "Record updated" });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

// helper functions
// -----------------------------------------------------------------------------------------------------------------

const update_submission = async (
  submission_id,
  attempt_id,
  question_id,
  answer_type,
  answer
) => {
  let type =
    answer_type === QuestionTypeEnum.SHORT
      ? "response"
      : answer_type === QuestionTypeEnum.TF
      ? "decision"
      : "selected";

  let sub = await Submission.findOne(
    {
      _id: submission_id,
      "attempts._id": attempt_id,
    },
    {
      "attempts.$": 1,
      _id: 0,
    }
  );

  let { attempts } = sub;
  let isStatsUpdated = attempts[0].isStatsUpdated;
  if (isStatsUpdated) {
    throw new Error(`The Practice Quiz has ended`);
  }

  let question = await Topic.aggregate([
    { $unwind: "$questions" },
    { $match: { "questions._id": mongod.ObjectID(question_id) } },
    {
      $project: {
        question: "$questions",
        _id: 0,
      },
    },
  ]);
  question = question[0];
  let ans_type =
    answer_type === QuestionTypeEnum.SHORT
      ? "answer"
      : answer_type === QuestionTypeEnum.TF
      ? "correct"
      : "options";

  let val_to_compare = question.question[ans_type];

  if (ans_type === "options") {
    val_to_compare = val_to_compare.findIndex((el) => el.correct) + 1;
  }
  let outcome =
    answer === val_to_compare
      ? OutcomeEnum.CORRECT
      : answer === -1
      ? OutcomeEnum.SKIPPED
      : OutcomeEnum.WRONG;
  await Submission.updateOne(
    {
      _id: submission_id,
    },
    {
      $set: {
        [`attempts.$[i].answers.$[j].${type}`]: answer,
        [`attempts.$[i].answers.$[j].outcome`]: outcome,
      },
    },
    {
      arrayFilters: [
        {
          "i._id": attempt_id,
        },
        {
          "j.question_id": question_id,
        },
      ],
    }
  );
};

const get_attempt_answer = async (submission_id, attempt_id, question_id) => {
  let res = await Submission.findOne(
    {
      _id: submission_id,
      "attempts._id": attempt_id,
    },
    {
      "attempts.$": 1,
      _id: 0,
    }
  );

  if (!res) return null;
  let attempt = res.attempts[0];
  if (!attempt) return null;
  let answer = attempt.answers.find(
    (answer) => answer.question_id == question_id
  );
  if (!answer) return null;
  answer.isStatsUpdated = attempt.isStatsUpdated;
  return answer;
};

const get_question_to_send = (topic_question) => {
  let question_to_send = {
    id: topic_question._id,
    type: topic_question.type,
    statement: topic_question.statement,
  };
  if (topic_question.type === "MCQ") {
    let temp = [];
    topic_question.options.forEach(({ text }) => {
      temp.push({ text });
    });
    question_to_send.options = temp;
    return question_to_send;
  }
  return question_to_send;
};

// functions no more used
// -------------------------------------------------------------------------------------------

const update_topic = async (topic_id, question_id, answer_type) => {
  let key =
    answer_type === 1 ? "correct" : answer_type === 0 ? "wrong" : "skipped";
  key = `questions.$.stats.${key}`;

  await Topic.updateOne(
    {
      _id: topic_id,
      "questions._id": question_id,
    },
    {
      $inc: {
        [key]: 1,
      },
    }
  );
};

const update_alloted_in_topic = async (topic_id, question_id) => {
  await Topic.updateOne(
    {
      _id: topic_id,
      "questions._id": question_id,
    },
    {
      $inc: {
        "questions.$.stats.alloted": 1,
      },
    }
  );
};

const update_current_question_in_submission = async (
  submission_id,
  attempt_id
) => {
  await Submission.updateOne(
    {
      _id: submission_id,
      "attempts._id": attempt_id,
    },
    {
      $inc: {
        "attempts.$.current_question": 1,
      },
    }
  );
};

module.exports = {
  createAttempt,
  getAttemptQuestion,
  recordAttempt,
};
