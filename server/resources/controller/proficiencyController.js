const Submission = require("../models/Submission");
const Topic = require("../models/Topic");

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
        $project: {
          questions: 0,
          "proficiency.topic_id": 0,
          "proficiency._id": 0,
          "proficiency.stats.alloted": 0,
        },
      },
    ]);
    topicAndProficiency = topicAndProficiency.map((data) => {
      return {
        ...data,
        proficiency: data.proficiency.filter(({ user_id }) => user_id == id),
      };
    });
    for (let i = 0; i < topicAndProficiency.length; i++) {
      let { proficiency } = topicAndProficiency[i];
      if (proficiency.length) {
        let lastAttempt = topicAndProficiency[i].proficiency[0].attempts.pop()
        topicAndProficiency[i].proficiency =
          topicAndProficiency[i].proficiency[0].stats;
        topicAndProficiency[i].lastAttempt = lastAttempt.stats
      }
    }
    res.status(200).json({
      error: false,
      data: topicAndProficiency,
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      message: `${err}`,
    });
  }
};

module.exports = { getTopicsSummary };
