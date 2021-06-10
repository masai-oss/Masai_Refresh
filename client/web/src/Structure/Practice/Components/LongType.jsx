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

const LongType = () => {
  let params = useParams();
  let indexNum = Number(params.index);
  let topic_ID = params.topicID;

  const { question } = useSelector((state) => state.practice_topics);
  const { practiceQuestionID, like_flag, bookmark_flag } = useSelector(
    (state) => state.practice_topics
  );
  console.log("practiceQuestionID[0]:", practiceQuestionID[0]);

  console.log("practiceQuestionIDlength:", practiceQuestionID.length);
  const dispatch = useDispatch();
  const history = useHistory();
  const { statement, answer } = question;
  console.log("like_flag:", like_flag);

  React.useEffect(() => {
    dispatch(
      practiceTopicActions.nextQuestion({
        topic_id: topic_ID,
        question_id: practiceQuestionID[indexNum - 1],
      })
    );
  }, [indexNum]);

  const getQuestion = (index) => {
    console.log(index);
    history.push(`${index}`);
    if (index > practiceQuestionID.length) {
      history.push("/practice_topics/completed");
    }
  };

  const toggleLike = () => {
    dispatch(practiceTopicActions.likes(practiceQuestionID[indexNum - 1]));
  };

  const toggleBookmark = () => {
    dispatch(practiceTopicActions.bookmarks(practiceQuestionID[indexNum - 1]));
  };

  return (
    <>
      <div className={styles.question}>
        <p className={styles.queFont}>{statement}</p>
        <AddCircleIcon className={styles.addCircle}></AddCircleIcon>
        <div className={styles.icons}>
          {bookmark_flag ? (
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
          {like_flag ? (
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
          <span className={styles.likes}>120</span>
        </div>
      </div>
      <div className={styles.answer}>
        <ReactMarkdown
          className={styles.answerFont}
          renderers={{ code: SyntaxHighlight }}
        >
          {answer}
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
    </>
  );
};

export default LongType;
