import React from "react";
import styles from "../Styles/LongType.module.css";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { practiceTopicActions } from "../State/action";

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
  const { practiceQuestionID } = useSelector((state) => state.practice_topics);
  console.log("practiceQuestionID[0]:", practiceQuestionID[0]);

  console.log("practiceQuestionIDlength:", practiceQuestionID.length);
  const dispatch = useDispatch();
  const history = useHistory();
  const { statement, answer, like_flag, bookmark_flag, likes } = question;
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

  return (
    <>
      <div className={styles.question}>
        <p className={styles.queFont}>{statement}</p>
        <div className={styles.icons}>
          <BookmarkBorderIcon></BookmarkBorderIcon>
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
        <ReactMarkdown renderers={{ code: SyntaxHighlight }}>
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
          className={styles.btn}
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
