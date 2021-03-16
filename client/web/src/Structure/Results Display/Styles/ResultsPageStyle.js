import styled from "styled-components";

export const ResultWrapper = styled.div`
  font-size: 16px;
`;

export const QuestionWrapper = styled.div`
  border: 1px solid #e8e8e8;
  padding: 10px 40px;
  border-radius: 2px;
  margin-bottom: 20px;

  :hover {
    background-color: #f2f2f2;
  }
`;

export const OutcomeTag = styled.span`
  background-color: ${(props) =>
    props.outcome === "SKIPPED"
      ? "#e3bf2d"
      : props.outcome === "CORRECT"
      ? "green"
      : "red"};
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
`;

export const QuestionLine = styled.div`
  position: absolute;
  background-color: #165f78;
  top: 0;
  bottom: 0;
  width: 10px;
`;

export const QuestionMain = styled.div`
  position: relative;
  font-weight: bolder;
`;

export const Bolder = styled.p`
  font-weight: bolder;
`;
export const Score = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 100px;
  background: dodgerblue;
  margin: auto;
  text-align: center;
  font-size: 40px;
  margin-top: 30px;
  padding-top: 70px;
  color: white;
`;

export const Result = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  margin: auto;
  margin-top: 30px;
`;

export const Correct = styled.div`
  color: green;
  font-size: 20px;
  font-weight: bolder;
`;

export const Wrong = styled.div`
  color: red;
  font-size: 20px;
  font-weight: bolder;
`;
export const Skipped = styled.div`
  color: orange;
  font-size: 20px;
  font-weight: bolder;
`;

export const Div = styled.div`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

