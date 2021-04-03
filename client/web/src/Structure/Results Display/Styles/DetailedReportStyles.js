import styled from "styled-components";

export const Wrapper = styled.section`
  padding: 2em;
  border: 1px solid grey;
  margin: 2em 0;
  text-align: left;
  background: #ffffff;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;

  & pre {
    white-space: pre-wrap;
    height: 100%;
    width: 100%;
    word-wrap: break-word;
  }
`;

export const Para = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
`;

export const MyResponse = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;

  & p {
    color: ${(props) =>
      props.correct === "skipped"
        ? "#efac00"
        : props.correct
        ? "#04a91e"
        : "#da0909"};
    padding-left: 5px;
  }
`;

export const CorrectResponse = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Outcome = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Response = styled.div`
  display: flex;
  padding-right: 2em;
  justify-content: flex-start;

  @media (max-width: 530px) {
    flex-direction: column;
  }

  & > div > p:nth-child(1) {
    font-weight: bold;
  }

  & > div {
    margin-right: 2em;
  }
`;
