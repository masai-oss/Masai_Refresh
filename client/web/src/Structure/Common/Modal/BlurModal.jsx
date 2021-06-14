<<<<<<< HEAD
  
=======
>>>>>>> 3d8afb473cc5b68532cc7aa8a575140dbf4af65c
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent } from "@material-ui/core";
<<<<<<< HEAD
import { BlurModalContext } from "../../../ContextProviders/BlurModalContextProvider";
import { makeStyles, Theme } from "@material-ui/core";
=======
import { BlurModalContext } from "../../../../ContextProviders/BlurModalContextProvider";
import { makeStyles, Theme } from "@material-ui/core";
import styles from "./BlurModal.module.css";
>>>>>>> 3d8afb473cc5b68532cc7aa8a575140dbf4af65c
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
<<<<<<< HEAD

=======
>>>>>>> 3d8afb473cc5b68532cc7aa8a575140dbf4af65c
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
<<<<<<< HEAD
export { BlurModal };
=======
export { BlurModal };
>>>>>>> 3d8afb473cc5b68532cc7aa8a575140dbf4af65c
