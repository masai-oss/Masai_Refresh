import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";
import { BlurModalContext } from "../../../../ContextProviders/BlurModalContextProvider";
import { makeStyles, Theme } from "@material-ui/core";
import styles from "./BlurModal.module.css";
const useStyles = makeStyles((theme) => ({
  backDrop: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
  dialog: {
    padding: "20px",
  },
}));
const BlurModal = ({ modalContent }) => {
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
  const classes = useStyles();
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <DialogContent className={classes.dialog}>{modalContent}</DialogContent>
      </Dialog>
    </div>
  );
};
export { BlurModal };
