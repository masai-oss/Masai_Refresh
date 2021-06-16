import styled from "styled-components";

export const IssueReport = styled.div`
  text-decoration-line: underline;
  cursor: pointer;
  font-size: 16px;
  color: #6c8d9e;
  margin: ${(props) => props.margin};
`;

export const Line = styled.div`
  background: lightgray;
  height: 1px;
`;

export const Tag = styled.div`
  font-size: 14px;
  color: ${(props) => (props.selected ? " #4285F4;" : "#4E565A")};
  background: ${(props) =>
    props.selected ? "rgba(30, 144, 255, 0.2)" : "#F1F1F1;"};
  border-radius: 4px;
  padding: 12px 12px 12px 16px;
  margin: 0 10px 10px 0;
  cursor: pointer;
  font-family: Open Sans;
  letter-spacing: 0.4px;
`;
export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CustomizedTextArea = styled.textarea`
  resize: none;
  overflow: auto;
  border: none;
  background: #f1f1f1;
  width: 100%;
  height: 155px;

  :focus {
    outline: 1px solid rgba(27, 48, 59, 0.2);
  }
`;

export const CustomButton = styled.button`
  background: ${(props) =>
    props.submitBtn
      ? "linear-gradient(239.11deg, #1E90FF -4.11%, #2B75CD 88.83%)"
      : "#f1f1f1"};
  padding: 16px 25px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  color: ${(props) => (props.submitBtn ? "#FFFFFF" : "#21424A")};
  margin: 0px 10px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
  width: 280px;
  height: 56px;
  margin-right: 18%;
  margin-bottom: 4%;
`;
