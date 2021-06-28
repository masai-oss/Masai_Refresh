import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../Assets/logo.svg";
import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";
import { BlurModal } from "../Common/DialogBoxes/BlurModal";
import { authActions } from "../Authentication";
import { CustomDialog, CrnAuth } from "../Common";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const GOOGLE_LOGOUT_URL = process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;
const ZOHO_LOGOUT_URL = process.env.REACT_APP_AUTH_ZOHO_LOGOUT_URL;

const Sidebar = ({ setRightSideContent }) => {
  const [displayProfileMenu, setDisplayProfileMenu] = React.useState(false);

  console.log("Current active Url --------------: ", window.location.pathname);
  const history = useHistory();
  const dispatch = useDispatch();
  const crnAuth = CrnAuth();
  const logout = () => {
    console.log("Google");
    window.open(GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  const zohoLogout = () => {
    console.log("Zoho");
    window.open(ZOHO_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  // const handleListItemClick = (id, e) => {
  //   console.log(e.currentTarget);
  //   setRightSideContent(id);
  //   setCurrentActiveTab(id);
  // };
  const signOutModalContent = <div>Sign Out</div>;
  const handleProfileClick = () => {
    setDisplayProfileMenu(!displayProfileMenu);
  };

  return (
    <div className={styles.Sidebar}>
      <div className={styles.logoContainer} onClick={() => history.push("/")}>
        <img src={logo} alt="Masai Refresh" />
      </div>
      <div className={styles.navContainer}>
        <ul>
          <li
            onClick={(e) => {
              setDisplayProfileMenu(false);
              history.push("/quiz_topics");
            }}
            className={
              window.location.pathname.includes("/quiz_topics")
                ? styles.selected__list_item
                : ""
            }
          >
            <img
              src="/logos/QuizIcon.svg"
              alt="Quiz"
              className={
                window.location.pathname.includes("/quiz_topics")
                  ? styles.svg__selected
                  : ""
              }
            />
            <h4
              className={
                window.location.pathname.includes("/quiz_topics")
                  ? styles.selected
                  : ""
              }
            >
              Quiz
            </h4>
          </li>
          <li
            onClick={(e) => {
              setDisplayProfileMenu(false);
              history.push("/practice_topics");
            }}
            className={
              window.location.pathname.includes("/practice_topics")
                ? styles.selected__list_item
                : ""
            }
          >
            <img
              src="/logos/PracticeIcon.svg"
              alt="Practice"
              className={
                window.location.pathname.includes("/practice_topics")
                  ? styles.svg__selected
                  : ""
              }
            />
            <h4
              className={
                window.location.pathname.includes("/practice_topics")
                  ? styles.selected
                  : ""
              }
            >
              Practice
            </h4>
          </li>
          <li
            onClick={(e) => handleProfileClick(e)}
            className={
              window.location.pathname.includes("/my_bookmarks") ||
              window.location.pathname.includes("/bookmarks")
                ? styles.selected__list_item
                : ""
            }
          >
            <img
              src="/logos/ProfileIcon.svg"
              alt="Profile"
              className={
                window.location.pathname.includes("/my_bookmarks") ||
                window.location.pathname.includes("/bookmarks")
                  ? styles.svg__selected
                  : ""
              }
            />
            <h4
              className={
                window.location.pathname.includes("/my_bookmarks") ||
                window.location.pathname.includes("/bookmarks")
                  ? styles.selected
                  : ""
              }
            >
              Profile
            </h4>
          </li>
          {displayProfileMenu ? (
            <ul className={styles.Sidebar__profileMenu}>
              <li
                onClick={(e) => {
                  history.push("/my_bookmarks");
                }}
                className={
                  window.location.pathname.includes("/my_bookmarks") ||
                  window.location.pathname.includes("/bookmarks")
                    ? styles.selected__list_item
                    : ""
                }
              >
                <img
                  src="/logos/BookmarkIcon.svg"
                  alt="MyBookmarks"
                  className={
                    window.location.pathname.includes("/my_bookmarks") ||
                    window.location.pathname.includes("/bookmarks")
                      ? styles.svg__selected
                      : ""
                  }
                />
                <h4
                  className={
                    window.location.pathname.includes("/my_bookmarks") ||
                    window.location.pathname.includes("/bookmarks")
                      ? styles.selected
                      : ""
                  }
                >
                  My Bookmarks
                </h4>
              </li>
            </ul>
          ) : (
            ""
          )}
          <li
            onClick={crnAuth === "google" ? logout : zohoLogout}
            className={styles.signOutButton}
          >
            <img src="/logos/SignOutIcon.svg" alt="SignOut" />
            <h4>Sign Out</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export { Sidebar };
