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

export const Tag = styled.button`
  font-size: 18px;
  color: ${(props) => (props.selected ? "white" : "#4E565A")};
  letter-spacing: 0.4px;
  background: ${(props) =>
    props.selected ? "#2D799F" : "rgba(108, 141, 158, 0.1)"};
  border: none;
  border-radius: 4px;
  padding: 12px 12px 12px 16px;
  margin: 0 10px 10px 0;
  cursor: pointer;
  font-family: dm Sans;
  font-size: 17px;

  :hover {
    background: ${(props) =>
      props.selected ? "#2D799F" : "rgba(37, 61, 73, 0.1)"};
  }
`;
export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CustomizedTextArea = styled.textarea`
  resize: none;
  overflow: auto;
  border: none;
  background: rgba(108, 141, 158, 0.1);
  width: 100%;
  height: 150px;

  :focus {
    outline: 1px solid rgba(27, 48, 59, 0.2);
  }
`;

export const CustomButton = styled.button`
  background: ${(props) =>
    props.submitBtn ? "#2D799F" : "rgba(108, 141, 158, 0.1)"};
  padding: 16px 25px;
  border: none;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  color: ${(props) => (props.submitBtn ? "white" : "#21424A")};
  margin: 0px 10px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};

  :focus {
    outline: none;
  }
`;

