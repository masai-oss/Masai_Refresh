import { makeStyles, createStyles } from "@material-ui/core/styles";

const QuestionFormStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      paddingTop: "100px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },

    formControl: {
      margin: theme.spacing(2),
      minWidth: 180,
    },
    textAreaWidth: {
      minWidth: "90%",
      maxWidth: "90%",
      borderRadius: "8px",
    },
    horizontalStyle: {
      display: "flex",
      flexDirection: "row",
    },
    verticalStyle: {
      display: "flex",
      flexDirection: "column",
    },
    buttons: {
      border: "none",
      color: "white",
      cursor: "pointer",
      width: "100px",
      height: "40px",
      outline: "none",
      borderRadius: "5px",
      margin: "20px 20px 20px 0",
      fontSize: "18px",
      boxShadow: "3px 3px 5px #C8C8C8",
    },
    save: {
      background: "#5B6AFA",
    },
    cancel: {
      background: "#ff6b81",
    },
    optionsAlign: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

export { QuestionFormStyles };
