import React from "react";
import styles from "../Styles/LongType.module.css";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { CodeSharp, FavoriteBorderOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { practiceTopicActions } from "../State/action";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Progress from "react-progressbar";

import report from "../../../Assets/report.svg";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "../../Common/SyntaxHighlighter";
import { useParams, useHistory } from "react-router-dom";
import { ReportDialog } from "../../Common";
import { Spinner } from "../../Common/Loader";
import { ReportDialogLong } from "../../Common/DialogBoxes/ReportModalLong";
import { ReportSuccessModal } from "../../Common/DialogBoxes/ReportSuccessModal";
import QuestionProgress from "../../Common/ProgressBar";

const LongType = () => {
  let params = useParams();
  let indexNum = Number(params.index);
  let topic_ID = params.topicID;
  const [likeStatus, setLikeStatus] = React.useState(false);
  const [allLikes, setAllLikes] = React.useState(0);
  const { question } = useSelector((state) => state.practice_topics);

  const { practiceQuestionID, isLoading, isLikeSuccess } = useSelector(
    (state) => state.practice_topics
  );

  const dispatch = useDispatch();
  const history = useHistory();

  let { statement, answer, like_flag, bookmark_flag, likes } = question;

  console.log("Like flag: ", like_flag);
  React.useEffect(() => {
    setLikeStatus(like_flag);
  }, [like_flag]);

  React.useEffect(() => {
    setLikeStatus(likes);
  }, [likes]);

  console.log("Like status: ", likeStatus);
  const toggleLike = async () => {
    await dispatch(
      practiceTopicActions.likes({
        question_id: practiceQuestionID[indexNum - 1],
        topic_id: topic_ID,
      })
    );
    if (isLikeSuccess) {
      if (likeStatus) {
        setAllLikes(allLikes - 1);
      } else {
        setAllLikes(allLikes + 1);
      }
      setLikeStatus(!likeStatus);
    }
  };

  React.useEffect(() => {
    dispatch(
      practiceTopicActions.nextQuestion({
        topic_id: topic_ID,
        question_id: practiceQuestionID[indexNum - 1],
      })
    );
  }, [indexNum]);

  React.useEffect(() => {
    dispatch(
      practiceTopicActions.nextQuestion({
        topic_id: topic_ID,
        question_id: practiceQuestionID[indexNum - 1],
      })
    );
  }, []);

  const getQuestion = (index) => {
    history.push(`${index}`);
    if (index > practiceQuestionID.length) {
      history.push("/practice_topics/completed");
    }
  };

  const toggleBookmark = () => {
    dispatch(
      practiceTopicActions.bookmarks({
        question_id: practiceQuestionID[indexNum - 1],
        topic_id: topic_ID,
      })
    );
  };
  const percentage = ((indexNum - 1) / practiceQuestionID.length) * 100;
  // console.log("practiceQuestionID:", practiceQuestionID);
  // console.log("indexNum:", indexNum);
  // console.log("percentage:", percentage);
  //console.log("IsLoading:------------ " + isLoading);
  return isLoading || !question ? (
    <Spinner />
  ) : (
    <>
      <QuestionProgress completed={percentage} />
      <div className={styles.question}>
        <p className={styles.queFont}>{statement}</p>
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
          <div className={styles.likesDiv}>
            {likeStatus ? (
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
            <div className={styles.likes}>{allLikes}</div>
          </div>
        </div>
      </div>
      <div className={styles.answer}>
        <ReactMarkdown
          className={styles.answerFont}
          renderers={{ code: SyntaxHighlight }}
        >
          {answer}
        </ReactMarkdown>
        <hr className={styles.hr} />
        <ReportDialogLong />
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
