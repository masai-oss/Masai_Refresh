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
  margin-left: 10px;
`;

export const QuestionLine = styled.div`
  position: absolute;
  background-color: #165f78;
  top: 0;
  bottom: 0;
  width: 5px;
`;

export const QuestionMain = styled.div`
  position: relative;
  font-weight: bolder;
`;

export const Bolder = styled.p`
  font-weight: bolder;
`;
export const Score = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background: dodgerblue;
  margin: 50px auto;
  font-size: 40px;
  color: white;
  display: grid;
  place-items: center;

`;

export const Result = styled.div`
  width: 200px;
  display: flex;
  margin: auto;
  flex-direction: column;
  background-color: #1f3440;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bolder;
  border-radius: 4px;
  color: white;

  h3{
    padding: 0;
    margin: 10px 0;
  }

  .correct{
    color: green;
  }

  .wrong{
    color: red;
  }

  .skipped{
    color: orange;
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Span = styled.span`
  font-weight: bold;
`;

export const QuestionContent = styled.pre`
  margin-left: 15px;
`