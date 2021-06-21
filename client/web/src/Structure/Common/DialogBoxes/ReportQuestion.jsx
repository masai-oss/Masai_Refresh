import React from "react";
import { BlurModalContext } from "../../../ContextProviders/BlurModalContextProvider";
import { BlurModal } from "./BlurModal";
import styles from "./ReportQuestion.module.css";
import report from "../../../Assets/report.svg";
import { ReportSuccessModal } from "./ReportSuccessModal";
import { practiceTopicActions } from "../../Practice/State/action";
import { useDispatch, useSelector } from "react-redux";
const ReportQuestion = ({
  issuesList,
  questionId,
  sendReport,
  reportModalStatus,
  setReportModalStatus,
}) => {
  const [issueData, setIssueData] = React.useState({
    options: [],
    description: "",
  });
  const dispatch = useDispatch();
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  if (reportModalStatus === "inputModalClose") {
    setReportModalStatus("greetingModalOpen");
  }
  const renderIssues = () => {
    return issuesList.map((issue) => {
      // console.log("Rendering: ", issueData.options);
      return (
        <p
          className={
            issueData.options.includes(issue)
              ? styles.ReportQuestion__Options__Box__selected
              : ""
          }
          onClick={() => toggleOption(issue)}
        >
          {issue}
        </p>
      );
    });
  };
  const checkReportData = () => {
    if (issueData.options.length == 0) {
      // console.log(issueData);
      alert("Please select atleast one option.");
      return;
    } else if (issueData.description === "") {
      // console.log(issueData);
      alert("Description cannot be empty!");
      return;
    } else {
      setIssueData({
        options: [],
        description: "",
      });
      sendReport(issueData);
    }
  };
  let modalContent = (
    <div className={styles.ReportQuestion__Header__Modal}>
      <div className={styles.ReportQuestion__Header}>
        <p>Report Issue with a question</p>
        <img
          src="/logos/CloseIcon.svg"
          alt="cross icon"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <div className={styles.ReportQuestion__divider}></div>
      <div className={styles.ReportQuestion__Options}>
        <p>What seems to be the issue with the question?</p>
        <div className={styles.ReportQuestion__Options__Box}>
          {renderIssues()}
        </div>
      </div>
      <div className={styles.ReportQuestion__Description}>
        <p>Add Details</p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={issueData.description}
          onChange={(event) =>
            setIssueData({ ...issueData, description: event.target.value })
          }
        ></textarea>
      </div>
      <div className={styles.ReportQuestionHeader__Submit}>
        <button onClick={checkReportData}>Submit</button>
      </div>
    </div>
  );

  if (reportModalStatus === "greetingModalOpen") {
    modalContent = (
      <div className={styles.ReportQuestion__Header__Modal}>
        <div className={styles.ReportQuestion__Header}>
          <p>Report Issue with a question</p>
          <img src="/logos/CloseIcon.svg" alt="cross icon" />
        </div>
        <div className={styles.ReportQuestion__divider}></div>
        <div className={styles.ReportQuestion__ThankYou}>
          <img src="/logos/TickIcon.svg" alt="success icon" />
          <p>
            Thank you for submitting your query. We will ensure the problem is
            resolved.
          </p>
        </div>

        <div className={styles.ReportQuestionHeader__Submit}>
          <button
            onClick={() => {
              setIsOpen(false);
              setReportModalStatus("inputModalOpen");
              dispatch(practiceTopicActions.postReportCompleted());
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const toggleOption = (option) => {
    let updatedOptions = [...issueData.options];
    // console.log("Before Updaing: ", issueData.options, option, updatedOptions);
    if (issueData.options.includes(option)) {
      updatedOptions = updatedOptions.filter(
        (singleOption) => singleOption !== option
      );
    } else {
      updatedOptions = [...issueData.options, option];
    }
    setIssueData({ ...issueData, options: [...updatedOptions] });
    // console.log("After Updating: ", issueData.options, option, updatedOptions);
  };

  // console.log("My Issue data us : ------------", issueData);

  return (
    <div>
      <div className={styles.ReportQuestion} onClick={() => setIsOpen(true)}>
        <img src={report} alt="report icon" />
        <h1>Report an issue</h1>
      </div>
      <BlurModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalContent={modalContent}
      />
    </div>
  );
};

export { ReportQuestion };
