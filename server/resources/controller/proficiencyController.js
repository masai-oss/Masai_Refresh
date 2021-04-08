const Submission = require("../models/Submission");
const Topic = require("../models/Topic");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const getTopicsSummary = async (req, res) => {
  const id = req.id;
  try {
    let topicAndProficiency = await Topic.aggregate([
      {
        $lookup: {
          from: "submissions",
          localField: "_id",
          foreignField: "topic_id",
          as: "proficiency",
        },
      },
      {
        $addFields: {
          totalNoOfQuestions: { $size: { $ifNull: ["$questions", []] } },
        },
      },
      {
        $unwind: {
          path: "$proficiency",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: { lastAttempt: { $last: "$proficiency.attempts" } },
      },
      {
        $project: {
          proficiency: "$proficiency.stats",
          lastAttempt: "$lastAttempt.stats",
          isStatsUpdated: "$lastAttempt.isStatsUpdated",
          user_id: "$proficiency.user_id",
          _id: 1,
          name: 1,
          icon: 1,
          totalNoOfQuestions: 1,
        },
      },
      {
        $match: { user_id: ObjectId(id) },
      },
      { $sort: { name: 1 } },
      {
        $project: {
          user_id: 0,
        },
      },
    ]);
    let allTopics = await Topic.aggregate([
      {
        $addFields: {
          totalNoOfQuestions: { $size: { $ifNull: ["$questions", []] } },
          proficiency: [],
        },
      },
      { $unset: "questions" },
      { $sort: { name: 1 } },
    ]).exec();
    for (let i = 0; i < allTopics.length; i++) {
      for (let j = 0; j < topicAndProficiency.length; j++) {
        if (allTopics[i].name === topicAndProficiency[j].name) {
          allTopics[i].proficiency = topicAndProficiency[j].proficiency;
          allTopics[i].lastAttempt = topicAndProficiency[j].lastAttempt;
          topicAndProficiency.splice(j, 1);
        }
      }
    }
    res.status(200).json({
      error: false,
      data: allTopics,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      message: `${err}`,
    });
  }
};
module.exports = { getTopicsSummary };
