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
import { BlurModal } from "../../Common/DialogBoxes/BlurModal";
import report from "../../../Assets/report.svg";
import ReactMarkdown from "react-markdown";
import { SyntaxHighlight } from "../../Common/SyntaxHighlighter";
import { useParams, useHistory } from "react-router-dom";
import { ReportQuestion } from "../../Common";
import { Spinner } from "../../Common/Loader";
import { ReportDialogLong } from "../../Common/DialogBoxes/ReportModalLong";
import { ReportSuccessModal } from "../../Common/DialogBoxes/ReportSuccessModal";
import QuestionProgress from "../../Common/ProgressBar";
import { BlurModalContext } from "../../../ContextProviders/BlurModalContextProvider";
import { storageEnums } from "../../../Enums/storageEnums";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import axios from "axios";
import QuestionNav from "../../Navbar/Components/QuestionNav";
import { practice_topics } from "../State/reducer";

const LongType = () => {
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  const [reportModalStatus, setReportModalStatus] =
    React.useState("inputModalOpen");
  let params = useParams();
  let indexNum = Number(params.index);
  let topic_ID = params.topicID;

  const { question } = useSelector((state) => state.practice_topics);
  const { practiceQuestionID, isLoading, practiceTopicsData } = useSelector(
    (state) => state.practice_topics
  );

  const topic = practiceTopicsData
    ? practiceTopicsData.find((topic) => topic._id === topic_ID)
    : "";
  console.log("Practice data:-------------------------", practiceTopicsData);

  const issuesList = [
    "Question Unclear",
    "Insufficient Data",
    "Explanation not clear",
    "Others",
  ];

  console.log("Practice data:-------------------------", topic);

  const { reportStatus } = useSelector((state) => state.practice_topics);

  React.useEffect(() => {
    if (reportStatus === "success") {
      setReportModalStatus("inputModalClose");
    }
  }, [reportStatus]);
  console.log("report success: ", reportStatus);
  const dispatch = useDispatch();
  const history = useHistory();

  let { statement, answer, like_flag, bookmark_flag, likes } = question;

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

  const sendReport = (issueData) => {
    dispatch(practiceTopicActions.postReport(question.question_id, issueData));
  };

  const percentage = ((indexNum - 1) / practiceQuestionID.length) * 100;

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

  const logoPath = topic
    ? `/logoForNav/${topic.name.toLowerCase()}/${topic.name.toLowerCase()}_logo.svg`
    : "";
  return !question ? (
    <Spinner />
  ) : (
    <>
      {/* <QuestionProgress completed={percentage} /> */}
      {topic ? (
        <QuestionNav
          secondIcon={secondIcon}
          firstIcon={logoPath}
          secondText={"Exit"}
          firstText={topic.name}
          progress
          length={practiceQuestionID.length}
          num={indexNum}
          handleExit={handleExit}
        />
      ) : (
        ""
      )}
      <div className={styles.question}>
        <p className={styles.queFont}>{statement}</p>
        <div className={styles.icons}>
          {bookmark_flag ? (
            <img
              src="/logos/BookmarkAfter.svg"
              alt="after bookmark icon"
              onClick={toggleBookmark}
              className={styles.Longtype__bookmarkicon}
            />
          ) : (
            <img
              src="/logos/BookmarkBefore.svg"
              alt="before bookmark icon"
              onClick={toggleBookmark}
              className={styles.Longtype__bookmarkicon}
            />
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
