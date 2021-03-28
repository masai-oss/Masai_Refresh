import { makeStyles } from "@material-ui/core/styles";

const LoginStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  zohoButtonStyle: { width: 60, height: 38, marginRight: 5 },
  lastCont: {
    padding: theme.spacing(1),
  },
}));

export { LoginStyles };
