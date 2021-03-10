const Submission = require("../models/Submission");
const Topic = require("../models/Topic");

const createSubmission = async (req, res) => {};

const createResult = async (attempts) => {
  try {
    let { answers, questions } = attempts;
    let finalResult = [];
    let getQuestions = questions.map(async (id, ind) => {
      try {
        let findQuestion = await Topic.find(
          { questions: { $elemMatch: { _id: id } } },
          { "questions.$": 1, _id: 0 }
        );
        return findQuestion;
      } catch (err) {
        console.log(err);
        return {
          error: true,
          err: err,
        };
      }
    });
    let allquestions = await Promise.all(getQuestions);
    for (let i = 0; i < answers.length; i++) {
      let crnQuestion = allquestions[i][0].questions[0];
      let temp = {};
      temp.statement = crnQuestion.statement;
      temp.outcome = answers[i].outcome;
      if (answers[i].type === "SHORT") {
        temp.correct = crnQuestion.answer;
        temp.response =
          answers[i].outcome === "SKIPPED" ? "Skipped" : answers[i].response;
      } else if (answers[i].type === "TF") {
        temp.correct = crnQuestion.correct;
        temp.response =
          answers[i].outcome === "SKIPPED" ? "Skipped" : answers[i].decision;
      } else if (answers[i].type === "MCQ") {
        temp.response =
          answers[i].outcome === "SKIPPED"
            ? "Skipped"
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
    console.log(err);
    return {
      error: true,
      err: err,
    };
  }
};

const getResults = async (req, res) => {
  let { quizId } = req.params;
  let { id } = req.id;
  if (quizId === undefined) {
    return res.status(400).json({
      error: true,
      message: "Send quiz id",
    });
  }
  try {
    let findedSubmission = await Submission.find(
      {
        $and: [{ attempts: { $elemMatch: { _id: quizId } } }, { userId: id }],
      },
      {
        "attempts.$": 1,
        _id: 0,
      }
    );
    if (!findedSubmission.length) {
      return res.status(400).json({
        error: true,
        message: "No Quiz Present",
      });
    }
    let [{ attempts }] = findedSubmission;
    let { answers, questions, isStatsUpdated } = attempts[0];
    let finalResult = await createResult(attempts[0]);
    let { error } = finalResult;
    if (error) {
      return res.status(400).json({
        error: true,
        err: finalResult.err,
      });
    }
    if (isStatsUpdated) {
      return res.status(200).json({
        error: false,
        result: finalResult,
      });
    } else {
      let specificAnswer = answers;
      let cumulativeStat = {
        alotted: specificAnswer.length,
        time: 0,
      };
      let answerAndId = specificAnswer.map(async (answer, index) => {
        let outcome = answer.outcome.toLowerCase();
        if (cumulativeStat[outcome] === undefined) {
          cumulativeStat[outcome] = 1;
        } else {
          cumulativeStat[outcome] += 1;
        }
        cumulativeStat.time += Number(answer.time);
        let id = questions[index];
        let whichToUpdate = `questions.$.stats.${outcome}`;
        try {
          const questionData = await Topic.findOneAndUpdate(
            { questions: { $elemMatch: { _id: id } } },
            { $inc: { "questions.$.stats.alloted": 1, [whichToUpdate]: 1 } }
          );
          return questionData;
        } catch (err) {
          return res.status(400).json({
            error: true,
            message: "Something Went Wrong",
            err: err,
          });
        }
      });
      let promiseAll = await Promise.all(answerAndId);
      let updateSubmission = await Submission.findOneAndUpdate(
        {
          $and: [{ attempts: { $elemMatch: { _id: quizId } } }, { userId: id }],
        },
        {
          $inc: {
            "stats.alloted": cumulativeStat.alotted,
            "stats.skipped": cumulativeStat.skipped,
            "stats.correct": cumulativeStat.correct,
            "stats.wrong": cumulativeStat.wrong,
            "attempts.$.stats.alloted": cumulativeStat.alotted,
            "attempts.$.stats.skipped": cumulativeStat.skipped,
            "attempts.$.stats.correct": cumulativeStat.correct,
            "attempts.$.stats.wrong": cumulativeStat.wrong,
            "attempts.$.stats.time": cumulativeStat.time,
          },
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
    console.log(err);
    return res.status(400).json({
      error: true,
      message: "Something Went Wrong",
      err: err,
    });
  }
};

module.exports = {
  createSubmission,
  getResults,
};
