import React from "react";
import { BlurModalContext } from "../../../ContextProviders/BlurModalContextProvider";
import { BlurModal } from "./BlurModal";
import styles from "./ReportQuestion.module.css";
import report from "../../../Assets/report.svg";
const ReportQuestion = ({ issuesList, questionId, sendReport }) => {
  const [issueData, setIssueData] = React.useState({
    options: [],
    description: "",
  });

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

  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);

  const modalContent = (
    <div className={styles.ReportQuestion__Header__Modal}>
      <div className={styles.ReportQuestion__Header}>
        <p>Report Issue with a question</p>
        <img src="/logos/CloseIcon.svg" alt="cross icon" />
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
