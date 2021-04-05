import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { adminActions } from "../State/action";
import { TopicsStyle } from "../Styles/TopicsStyle";

export const SearchByTopic = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const currentTopicData = useSelector(
    (state) => state.admin.specificTopicData
  );

  const classes = TopicsStyle();

  useEffect(() => {
    dispatch(adminActions.getCrudTopicById(params.id));
  }, [dispatch, params.id]);

  return (
    <div>
      {currentTopicData && (
        <div>
          <div className={classes.flex}>
            <h3> {currentTopicData.name} </h3>
          </div>
          {currentTopicData.questions.map((el) => {
            return (
              <li key={el._id} className={classes.list_TopicPage}>
                {" "}
                {el.explanation}{" "}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};
