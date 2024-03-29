const Topic = require("../models/Topic");
const Practice = require("../models/Practice");
const TopicsEnum = require("../utils/enums/TopicsEnum");
const {
  addTopicValidation,
  topicValidation,
} = require("../utils/validation/topicValidation");

const getAllTopics = async (req, res) => {
  try {
    let result = await Topic.aggregate([
      {
        $addFields: {
          noOfQuestion: { $size: "$questions" },
        },
      },
      { $unset: "questions" },
    ]).exec();

    let practiceResult = await Practice.aggregate([
      {
        $addFields: {
          noOfQuestion: { $size: "$questions" },
        },
      },
      { $unset: "questions" },
    ]).exec();

    result = result.map((document) => {
      let obj = practiceResult.find((item) => {
        return item.name === document.name;
      });
      if (!obj) {
        return document;
      }
      document = {
        ...document,
        noOfQuestion: document.noOfQuestion + obj.noOfQuestion,
      };
      return document;
    });

    res.status(200).json({ error: false, data: result });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

const getTopicById = async (req, res) => {
  const { id } = req.params;
  if (id === undefined) {
    return res.status(400).json({ error: true, message: "Pass Topic ID" });
  }
  try {
    let result = await Topic.findById(id).exec();
    if (!result) {
      return res.status(404).json({
        error: true,
        message: "Topic with the given ID does not exist",
      });
    }
    res.status(200).json({ error: false, data: result });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

const getTopicByName = async (req, res) => {
  let { name } = req.params;
  const { error } = topicValidation(req.params);
  if (error) {
    return res.status(400).json({
      error: true,
      reason: error.details[0].message,
    });
  }
  try {
    name = name.toUpperCase();
    let result = await Topic.findOne({ name }).exec();
    if (!result) {
      return res
        .status(404)
        .json({ error: true, message: "Given topic name does not exist" });
    }
    res.status(200).json({ error: false, data: result });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

const addTopic = async (req, res) => {
  let { name } = req.body;
  if (req.file === undefined) {
    return res.status(400).json({ error: true, message: `pass image` });
  }
  const { error } = addTopicValidation({
    ...req.body,
    icon: req.file.filename,
  });
  if (error) {
    return res.status(400).json({
      error: true,
      reason: error.details[0].message,
    });
  }
  try {
    name = name.trim();
    if (name.toUpperCase() in TopicsEnum) {
      name = TopicsEnum[name.toUpperCase()];
    } else {
      throw new Error(
        "topic name does not figure in our database. Can only create Topics from these subjects: " +
          Object.keys(TopicsEnum).join(", ")
      );
    }
    let temp = await Topic.findOne({ name }).exec();
    if (!temp) {
      await new Topic(
        { name, icon: req.file.filename },
        { questions: 0 }
      ).save();
      res
        .status(201)
        .json({ error: false, message: "The topic has been created." });
    } else {
      res
        .status(409)
        .json({ error: true, message: "The topic already exists." });
    }
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

const updateIcon = async (req, res) => {
  const { id } = req.params;
  if (req.file === undefined) {
    return res.status(400).json({ error: true, message: `pass image` });
  }
  if (id === undefined) {
    return res.status(400).json({ error: true, message: "Topic ID missing" });
  }
  try {
    await Topic.updateOne({ _id: id }, { icon: req.file.filename });
    res
      .status(200)
      .json({ error: false, message: "The topic has been updated" });
  } catch (err) {
    res.status(400).json({ error: true, message: `${err}` });
  }
};

// redundant functions
// -----------------------------------------------------------------------------------------------

const deleteTopic = async (req, res) => {
  return res
    .status(400)
    .json({ error: true, message: "The API is currently not in use" });
};

module.exports = {
  getAllTopics,
  getTopicById,
  getTopicByName,
  addTopic,
  deleteTopic,
  updateIcon,
};
