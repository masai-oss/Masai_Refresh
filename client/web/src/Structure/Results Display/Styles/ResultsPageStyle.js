import styled from "styled-components";

export const ResultWrapper = styled.div`
  font-size: 16px;
  background-color: #fff;
  margin: 16px;
  box-shadow: 0px 0px 1px 1px rgb(0,0,0,0.25);
  background-color: #fff;
`;

export const Result = styled.div`
  padding: 20px;

  .bigText {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 150%;
  }

  .normalText {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    color: #000000;
  }

  .attempts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 365px;
    width:100%;
  }

  .attemptsItem {
    text-align: right;
  }

  .correct {
    color: #04A91E;
  }

  .wrong {
    color: #DA0909;
;
  }

  .skipped {
    color: #EFAC00;
  }
`;
