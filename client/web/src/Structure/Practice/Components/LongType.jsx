import React from "react";
import styles from "../Styles/LongType.module.css";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { practiceTopicActions } from "../State/action";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import report from "../../../Assets/report.svg";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "../../Common/SyntaxHighlighter";
import { useParams, useHistory } from "react-router-dom";
import { ReportDialog } from "../../Common";
import { Spinner } from "../../Common/Loader";

const LongType = () => {
  let params = useParams();
  let indexNum = Number(params.index);
  let topic_ID = params.topicID;
  React.useEffect(() => {
    console.log("Called-----------");
    dispatch(
      practiceTopicActions.nextQuestion({
        topic_id: topic_ID,
        question_id: practiceQuestionID[indexNum - 1],
      })
    );
  }, [indexNum]);
  console.log(indexNum, topic_ID, params);
  const { question } = useSelector((state) => state.practice_topics);

  const { practiceQuestionID, isLoading } = useSelector(
    (state) => state.practice_topics
  );

  const dispatch = useDispatch();
  const history = useHistory();
  // const { statement, answer, like_flag, bookmark_flag, likes } = question;

  const getQuestion = (index) => {
    history.push(`${index}`);
    if (index > practiceQuestionID.length) {
      history.push("/practice_topics/completed");
    }
  };

  const toggleLike = () => {
    dispatch(
      practiceTopicActions.likes({
        question_id: practiceQuestionID[indexNum - 1],
        topic_id: topic_ID,
      })
    );
  };

  const toggleBookmark = () => {
    dispatch(
      practiceTopicActions.bookmarks({
        question_id: practiceQuestionID[indexNum - 1],
        topic_id: topic_ID,
      })
    );
  };
  console.log(question);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {question ? (
        <div>
          <div className={styles.question}>
            <p className={styles.queFont}>{question.statement}</p>
            <div className={styles.icons}>
              {question.bookmark_flag ? (
                <BookmarkIcon
                  className={styles.filledBookmark}
                  onClick={toggleBookmark}
                ></BookmarkIcon>
              ) : (
                <BookmarkBorderIcon
                  className={styles.bookmark}
                  onClick={toggleBookmark}
                ></BookmarkBorderIcon>
              )}
              <div className={styles.likesDiv}>
                {question.like_flag ? (
                  <FavoriteIcon
                    onClick={toggleLike}
                    className={styles.filledHeart}
                  ></FavoriteIcon>
                ) : (
                  <FavoriteBorderOutlined
                    onClick={toggleLike}
                    className={styles.heart}
                  ></FavoriteBorderOutlined>
                )}
                <div className={styles.likes}>{question.likes}</div>
              </div>
            </div>
          </div>
          <div className={styles.answer}>
            <ReactMarkdown
              className={styles.answerFont}
              renderers={{ code: SyntaxHighlight }}
            >
              {question.answer}
            </ReactMarkdown>
            <div className={styles.hr}></div>
            <div style={{ display: "flex" }}>
              <img className={styles.img} src={report} alt="report" />
              <span className={styles.report}>Report an issue</span>{" "}
            </div>
          </div>
          <div className={styles.nextBtn}>
            <button
              disabled={indexNum == 1 ? true : false}
              onClick={() => getQuestion(indexNum - 1)}
              className={indexNum == 1 ? styles.disabledBtn : styles.btn}
            >
              Back
            </button>
            <button
              onClick={() => getQuestion(indexNum + 1)}
              className={styles.btn}
            >
              Next
            </button>
          </div>
          <div style={{ height: 100 }}></div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default LongType;
