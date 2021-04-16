const mongoose = require("mongoose");
const { Submission } = require("../models/Submission");
const { Stat } = require("../models/Stats");
const ObjectId = mongoose.Types.ObjectId;

const createResult = async (attempts) => {
  try {
    let { answers, questions } = attempts;
    let allquestions = await Topic.aggregate({
      _id: {
        $in: questions.map((id) => ObjectId(id)),
      },
    });
    let sortQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < allquestions.length; j++) {
        if (
          JSON.stringify(allquestions[j]._id) === JSON.stringify(questions[i])
        ) {
          sortQuestions.push(allquestions[j]);
          allquestions.splice(j, 1);
        }
      }
    }
    let finalResult = [];
    for (let i = 0; i < answers.length; i++) {
      let crnQuestion = sortQuestions[i];
      let temp = {};
      temp.statement = crnQuestion.statement;
      temp.source = crnQuestion.source;
      temp.question_id = crnQuestion._id;
      temp.outcome = answers[i].outcome;
      temp.explanation = crnQuestion.explanation || " ";
      if (answers[i].type === "SHORT") {
        temp.correct = crnQuestion.answer;
        temp.response =
          answers[i].outcome === "SKIPPED" ? "skipped" : answers[i].response;
      } else if (answers[i].type === "TF") {
        temp.correct = crnQuestion.correct;
        temp.response =
          answers[i].outcome === "SKIPPED" ? "skipped" : answers[i].decision;
      } else if (answers[i].type === "MCQ") {
        temp.response =
          answers[i].outcome === "SKIPPED"
            ? "skipped"
            : crnQuestion.options[answers[i].selected - 1].text;
        crnQuestion.options.forEach(({ text, correct }) => {
          if (correct) {
            temp.correct = text;
          }
        });
      }
      finalResult.push(temp);
    }
    return finalResult;
  } catch (err) {
    return {
      error: true,
      err: `${err}`,
    };
  }
};

const getResult = async (req, res) => {
  let { attempt_id } = req.params;
  let id = req.id;
  if (attempt_id === undefined) {
    return res.status(400).json({
      error: true,
      message: "Send quiz id",
    });
  }
  try {
    // Checking if the submission is present
    let findedSubmission = await Submission.find(
      {
        $and: [
          { attempts: { $elemMatch: { _id: attempt_id } } },
          { user_id: id },
        ],
      },
      {
        "attempts.$": 1,
        topic_id: 1,
        stats: 1,
      }
    );
    if (!findedSubmission.length) {
      return res.status(400).json({
        error: true,
        message: "No Quiz Present",
      });
    }
    let [{ attempts, topic_id, _id: submission_id }] = findedSubmission;
    let { answers, questions, isStatsUpdated } = attempts[0];
    let finalResult = await createResult(attempts[0], topic_id);
    let { error } = finalResult;
    if (error) {
      return res.status(400).json({
        error: true,
        err: finalResult.err,
      });
    }
    // Pre checking if the stats are already updated.
    if (isStatsUpdated) {
      return res.status(200).json({
        error: false,
        result: finalResult,
      });
    } else {
      let specificAnswer = answers;
      let cumulativeStat = {
        alotted: specificAnswer.length,
        correct: 0,
        wrong: 0,
        skipped: 0,
      };
      // Updating the stat of the questions
      let answerAndId = specificAnswer.map(async (answer, index) => {
        let outcome = answer.outcome.toLowerCase();
        cumulativeStat[outcome] += 1;
        let id = questions[index];
        let whichToUpdate = outcome;
        const questionData = await Stat.findOneAndUpdate(
          { question_id: id },
          { $inc: { alloted: 1, [whichToUpdate]: 1 } }
        );
        return questionData;
      });
      await Promise.all(answerAndId);
      // Updating the stat of the Submission
      await Stat.findOneAndUpdate(
        { submission_id },
        {
          $inc: cumulativeStat,
        }
      );
      // Updating the stat of the attempt
      await Stat.findOneAndUpdate(
        { attempt_id },
        {
          $inc: cumulativeStat,
        }
      );
      // Changing the isStatsUpdated to true to complete creating the result
      await Submission.findOneAndUpdate(
        {
          $and: [
            { attempts: { $elemMatch: { _id: attempt_id } } },
            { user_id: id },
          ],
        },
        {
          $set: {
            "attempts.$.isStatsUpdated": true,
          },
        }
      );
      return res.status(200).json({
        error: false,
        result: finalResult,
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      err: `${err}`,
    });
  }
};

module.exports = { getResult };
