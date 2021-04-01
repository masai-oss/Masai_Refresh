import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const QuestionStyles = makeStyles((theme) => ({
  main: {
    boxSizing: "border-box",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    padding: "31px",

    "& button": {
      border: "none",
      padding: "16px",
    },
  },
  nextBtn: {
    height: "48px",
    width: "73px",
    background: "#6C8D9E",
    boxShadow: "0px 6px 12px 0px rgb(0,0,0,0.16)",
    borderRadius: "2px",
    padding: "16px",
    fontWeight: "bold",
    border: 0,
  },
  btns: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 24px",
    alignItems: "center",
  },
  prevBtn: {
    display: "flex",
    alignItems: "center",

    "& p": {
      padding: "16px",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "150%",
      color: "#333434",
    },
  },
  skipBtn: {
    backgroundColor: "inherit",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    marginRight: "20px",
  },

  cursor_pointer: {
    cursor: "pointer",
  },
}));

const PrevButton = styled.div`
  opacity: ${(props) => (props.first_question ? 0.2 : 1)};
  cursor: ${(props) => (props.first_question ? "default" : "pointer")};
`;

const NextButton = styled.button`
  opacity: ${(props) => (props.attempted ? 1 : 0.2)};
  cursor: ${(props) => (props.attempted ? "pointer" : "default")};
`;

export { QuestionStyles, PrevButton, NextButton };
