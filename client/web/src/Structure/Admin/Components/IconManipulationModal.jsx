import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  IconButton,
  Avatar,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import { TopicsStyle } from "../Styles/TopicsStyle";
import { adminActions } from "../State/action";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton, Message } from "../../Common";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IconManipulationDialog = ({
  handleClose,
  dialogInfo: { open, icon: crnIcon, name, id },
}) => {
  const classess = TopicsStyle();
  const dispatch = useDispatch();
  const isUploadingIcon = useSelector((state) => state.admin.isUploadingIcon);
  const isUploadError = useSelector((state) => state.admin.isUploadError);

  let iconStr = {
    preview: false,
    previewFile: "",
    file: "",
    name: "",
  };
  let messageStr = {
    open: false,
    message: "",
    severity: "",
  };

  const [icon, setIcon] = useState(iconStr);
  const [message, showMessage] = useState(messageStr);
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    showMessage(messageStr);
  };

  //* preview image fn
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(" ");
    });
  };

  const addIcon = async (info) => {
    try {
      let file = info?.target?.files[0];
      let length = info?.target?.files?.length;
      let previewFile = length !== 0 ? await getBase64(file) : " ";
      let previewFlag = length !== 0 ? true : false;
      setIcon({
        file: file,
        preview: previewFlag,
        previewFile: previewFile,
        name: file?.name,
      });
    } catch (error) {
      alert(error);
    }
  };

  const removePreview = () => {
    setIcon(iconStr);
  };
  const uploadIcon = () => {
    if (icon.preview) {
      let { file } = icon;
      dispatch(adminActions.uploadIconProcess({ file, id })).then((res) => {
        if (res === "success") {
          setIcon(iconStr);
          dispatch(adminActions.getCrudTopics())
          showMessage({
            open: true,
            message: "Successfully Uploaded Icon",
            severity: "success",
          });
          handleClose()
        } else {
          showMessage({
            open: true,
            message: "Something went wrong",
            severity: "error",
          });
        }
      });
    } else {
      showMessage({
        open: true,
        severity: "warning",
        message: "Try to upload after you added a image",
      });
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Change Icon"}</DialogTitle>
        <DialogContent>
          <div className={classess.holder}>
            {icon.preview ? (
              <img
                className={classess.showIcon}
                alt={name}
                src={icon.previewFile}
              />
            ) : (
              <Avatar className={classess.showIcon} alt={name} src={crnIcon} />
            )}
            <input
              accept="image/*"
              id="icon-button-file"
              name="icon"
              type="file"
              className={classess.inputProp}
              onChange={addIcon}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera className={classess.pictureBl} />
              </IconButton>
            </label>
          </div>
          {icon.preview && (
            <div style={{ display: "flex" }}>
              <p>{icon.name}</p>
              <IconButton aria-label="delete" onClick={removePreview}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {icon.preview && (
            <LoadingButton
              isLoading={isUploadingIcon}
              isSuccess={isUploadError}
              innerText="Start"
              submit={uploadIcon}
            />
          )}
        </DialogActions>
      </Dialog>
      {message.open && <Message message={message} handleCloseMessage={handleCloseMessage} />}
    </div>
  );
};

export { IconManipulationDialog };
