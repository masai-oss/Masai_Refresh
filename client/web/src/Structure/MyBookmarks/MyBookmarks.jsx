import React from "react";
import { Card } from "../Common/Card";
import styles from "./Styles/MyBookmarks.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarksCount } from "./State/action";
import { Spinner } from "../Common/Loader";
const MyBookmarks = ({ setRightSideContent }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBookmarksCount());
  }, []);

  const myBookmarks = useSelector((state) => state.myBookmarks.myBookmarks);

  let totalBookmarks =
    myBookmarks && myBookmarks.length
      ? myBookmarks.reduce((prev, next) => {
          return prev + next.total_bookmarks;
        }, 0)
      : 0;
  const renderMyBookmarks = () => {
    if (myBookmarks == null) {
      return <Spinner />;
    } else if (myBookmarks.length === 0) {
      return <h1>No bookmarks yet.</h1>;
    } else {
      return (
        myBookmarks &&
        myBookmarks.length &&
        myBookmarks.map((myBookmark, index) => {
          totalBookmarks += myBookmark.total_bookmarks;

          const cardContent = (
            <div className={styles.cardContent}>
              <h3>
                {myBookmark.total_bookmarks}{" "}
                {myBookmark.total_bookmarks == 1 ? "Bookmark" : "Bookmarks"}
              </h3>
              <button>View</button>
            </div>
          );
          return (
            <Card
              key={index}
              name={myBookmark.name.toLowerCase()}
              cardContent={cardContent}
              onClick={() => {
                setRightSideContent("Bookmarks");
                history.push(`bookmarks/${myBookmark._id}`);
              }}
            />
          );
        })
      );
    }
  };

  return (
    <div className={styles.MyBookmarks}>
      <div className={styles.MyBookmarks__header}>
        <p>{totalBookmarks} Total Bookmarks</p>
      </div>

      <div className={styles.MyBookmarks__content}>{renderMyBookmarks()}</div>

      {/* <h1 onClick={() => setRightSideContent("Bookmarks")}>My Bookmarks</h1> */}
    </div>
  );
};

export { MyBookmarks };
