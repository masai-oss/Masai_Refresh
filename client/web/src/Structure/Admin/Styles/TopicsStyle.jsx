import { makeStyles, createStyles } from "@material-ui/core/styles";

export const TopicsStyle = makeStyles((theme) =>
  createStyles({
    iconStyle: {
      width: 100,
      height: 100,
      borderRadius: 8,
      border: "1px solid #e6e6e6",
      objectFit: "cover",
      margin: "0 0 0 15px",
    },
    holder: {
      display: "flex",
      justifyContent: "space-between",
      width: 230,
    },
    inputProp: {
      display: "none",
    },
    showIcon: {
      width: 100,
      height: 100,
    },
    pictureBl: {
      margin: 15,
      width: 35,
    },
  })
);
