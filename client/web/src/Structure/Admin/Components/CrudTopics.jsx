import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../State/action";
import { TopicsStyle } from "../Styles/TopicsStyle";
import { IconManipulationDialog } from "./IconManipulationModal";
import { Spinner, PageNotFound } from "../../Common";
import { useHistory } from "react-router";
import styles from "../Styles/CrudTopics.module.css";
import { Navbar } from "../../Navbar/index";

const UPLOADED_ICONS_URL = process.env.REACT_APP_UPLOADED_ICONS_URL;
export const CrudTopics = () => {
  const dispatch = useDispatch();
  const topicsData = useSelector((state) => state.admin.topicsData);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isError = useSelector((state) => state.admin.isError);
  const classes = TopicsStyle();
  const history = useHistory();
  useEffect(() => {
    dispatch(adminActions.getCrudTopics());
  }, [dispatch]);

  const modIcon = (icon) => {
    return `${UPLOADED_ICONS_URL}${icon}`;
  };
  let dialogInfoStr = {
    open: false,
    icon: "",
    name: "",
    id: "",
  };
  const [dialogInfo, setDialogInfo] = useState(dialogInfoStr);

  const handleClickOpen = ({ icon, name, id }) => {
    setDialogInfo({
      open: true,
      icon: icon,
      name: name,
      id: id,
    });
  };

  const handleClose = () => {
    setDialogInfo(dialogInfoStr);
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <button onClick={() => history.push("/admin/questions/all")}>Quiz</button>
      <button onClick={() => history.push("/admin/practice_questions/all")}>
        Practice
      </button>
      <div className={styles.cardContainer}>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <PageNotFound
            errorNum='400'
            message='Something went wrong'
            des=' Brace Yourself till we get the error fixed'
          />
        ) : (
          topicsData &&
          topicsData?.map(({ name, noOfQuestion, icon, _id }, index) => {
            return (
              <div className={styles.card} key={index}>
                <img
                  className={classes.iconStyle}
                  alt={name}
                  src={
                    (icon =
                      icon !== undefined &&
                      ( icon.includes(".png") ||
                        icon.includes(".jpeg") ||
                        icon.includes(".svg") ||
                        icon === " " )
                        ? `/logos/${name.toLowerCase()}/${name.toLowerCase()}_logo.svg`
                        : icon)
                  }
                  onClick={() =>
                    handleClickOpen({ icon: icon, name: name, id: _id })
                  }
                />
                <div className={styles.cardName}>
                  <span className={styles.cardNameTitle}>{name}</span>
                  <span className={styles.cardNameQuestions}>
                    {noOfQuestion} Questions
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <IconManipulationDialog
        handleClose={handleClose}
        dialogInfo={dialogInfo}
      />
    </div>
  );
};
