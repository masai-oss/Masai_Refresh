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
import { ReportQuestion } from "../../Common";
import report from "../../../Assets/report.svg";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "../../Common/SyntaxHighlighter";
import { useParams, useHistory } from "react-router-dom";
import { ReportDialog } from "../../Common";
import { Spinner } from "../../Common/Loader";
import { ReportDialogLong } from "../../Common/DialogBoxes/ReportModalLong";
import { ReportSuccessModal } from "../../Common/DialogBoxes/ReportSuccessModal";
import QuestionProgress from "../../Common/ProgressBar";
import QuestionNav from "../../Navbar/Components/QuestionNav";

const SingleQuestionBookmarkQuestion = () => {
  const [reportModalStatus, setReportModalStatus] =
    React.useState("inputModalOpen");
  let params = useParams();
  let questionId = params.questionId;
  let topic_ID = params.topicID;
  const issuesList = [
    "Question Unclear",
    "Insufficient Data",
    "Explanation not clear",
    "Others",
  ];
  const sendReport = (issueData) => {
    dispatch(practiceTopicActions.postReport(question.question_id, issueData));
  };

  const { question } = useSelector((state) => state.practice_topics);
  console.log("Question is :---------------- ", question);
  const dispatch = useDispatch();
  const history = useHistory();

  let { statement, answer, like_flag, bookmark_flag, likes } = question;
  const { reportStatus } = useSelector((state) => state.practice_topics);

  React.useEffect(() => {
    if (reportStatus === "success") {
      setReportModalStatus("inputModalClose");
    }
  }, [reportStatus]);
  React.useEffect(() => {
    dispatch(
      practiceTopicActions.nextQuestion({
        topic_id: topic_ID,
        question_id: questionId,
      })
    );
  }, []);
  const secondIcon = (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 21L3 3"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 3L3 21"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );

  const handleExit = () => {
    history.push("/quiz_topics");
  };

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
  // const logoPath = `/logoForNav/${topic.toLowerCase()}/${topic.toLowerCase()}_logo.svg`;
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
        <ReportQuestion
          issuesList={issuesList}
          questionId={question._id}
          sendReport={sendReport}
          reportModalStatus={reportModalStatus}
          setReportModalStatus={setReportModalStatus}
        />
      </div>

      <div style={{ height: 100 }}></div>
    </>
  );
};

export { SingleQuestionBookmarkQuestion };
