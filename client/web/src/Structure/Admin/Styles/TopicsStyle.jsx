import { makeStyles, createStyles } from "@material-ui/core/styles";

export const TopicsStyle = makeStyles((theme) =>
  createStyles({
    iconStyle: {
      width: 70,
      height: 70,
      borderRadius: 15,
      border: "3px solid #2196f3",
      "&:hover": {
        backgroundColor: "rgb(7, 177, 77, 0.42)",
      },
    },
    holder: {
      display: "flex",
      justifyContent: "space-between",
      width: 200
    },
    inputProp: {
      display: "none",
    },
    showIcon: {
      width: 60,
      height: 60,
    },
    pictureBl: {
      marginTop:10,
      width: 25
    },
  })
);
