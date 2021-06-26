import { makeStyles, createStyles } from "@material-ui/core/styles";

const QuestionsStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    container: {
      backgroundColor: "#EFEFF6",
      minWidth: "100vw",
      minHeight: "100vh",
    },
    top: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    save: {
      backgroundColor: "#5B6AFA",
      color: "white",
    },
    disable: {
      backgroundColor: "#ff6b81",
      color: "white",
    },
    id: {
      textDecoration: "underline",
      cursor: "pointer",
      color: "#5B6AFA",
    },
    reports: {
      cursor: "pointer",
      color: "#5B6AFA",
    },
    modal: {
      display: "flex",
      padding: theme.spacing(1),
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: "100%",
      height: "100%",
      backgroundColor: "white",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflowY: "auto",
      position: "relative",
    },
    evenSpace: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    switchBase: {
      color: "#6C8D9E",
      "&$checked": {
        color: "#6C8D9E",
      },
      "&$checked + $track": {
        backgroundColor: "#6C8D9E",
      },
    },
    checked: {},
    track: {},
  })
);

export { QuestionsStyles };
