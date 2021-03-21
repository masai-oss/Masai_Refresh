import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Avatar, Card, CardContent, Typography } from "@material-ui/core";
import { adminActions } from "../State/action";
import { TopicsStyle } from "../Styles/TopicsStyle";
import { IconManipulationDialog } from "./IconManipulationModal";

const UPLOADED_ICONS_URL = process.env.REACT_APP_UPLOADED_ICONS_URL;
export const CrudTopics = () => {
  const dispatch = useDispatch();
  const topicsData = useSelector((state) => state.admin.topicsData);
  const classes = TopicsStyle();

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

  const handleClickOpen = ({icon, name,id}) => {
    setDialogInfo({
      open: true,
      icon: icon,
      name: name,
      id: id
    });
  };

  const handleClose = () => {
    setDialogInfo(dialogInfoStr);
  };
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      {topicsData &&
        topicsData?.map(({ name, questions, icon, _id }, index) => (
          <Grid item xs={12} sm={10} md={6} lg={4} xl={3} key={index}>
            <Card>
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Avatar
                    alt={name}
                    src={
                      (icon =
                        icon !== undefined &&
                        (icon.includes(".png") ||
                          icon.includes(".jpeg") ||
                          icon.includes(".svg"))
                          ? modIcon(icon)
                          : icon)
                    }
                    onClick={() => handleClickOpen({icon: icon, name: name, id: _id})}
                    className={classes.iconStyle}
                  />
                  <div>
                    <Typography variant="h4" component="h2">
                      {name}
                    </Typography>
                    <Typography variant="h6" component="h2">
                      Total Questions : {questions.length}
                    </Typography>
                  </div>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      <IconManipulationDialog handleClose={handleClose} dialogInfo={dialogInfo} />
    </Grid>
  );
};
