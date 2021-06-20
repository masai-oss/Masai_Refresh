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

const SingleQuestionBookmarkQuestion = () => {
  let params = useParams();
  let questionId = params.questionId;
  let topic_ID = params.topicID;

  const { question } = useSelector((state) => state.practice_topics);

  const dispatch = useDispatch();
  const history = useHistory();

  let { statement, answer, like_flag, bookmark_flag, likes } = question;

  React.useEffect(() => {
    dispatch(
      practiceTopicActions.nextQuestion({
        topic_id: topic_ID,
        question_id: questionId,
      })
    );
  }, []);

  const toggleLike = () => {
    dispatch(
      practiceTopicActions.likes({
        question_id: questionId,
        topic_id: topic_ID,
      })
    );
  };

  const toggleBookmark = () => {
    dispatch(
      practiceTopicActions.bookmarks({
        question_id: questionId,
        topic_id: topic_ID,
      })
    );
  };

  return !question ? (
    <Spinner />
  ) : (
    <>
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
            <div className={styles.likes}>{likes}</div>
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

      <div style={{ height: 100 }}></div>
    </>
  );
};

export { SingleQuestionBookmarkQuestion };
