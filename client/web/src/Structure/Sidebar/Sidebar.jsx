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
  const [toggle, setToggle] = React.useState(false);
  const [displayProfileMenu, setDisplayProfileMenu] = React.useState(false);
  const [currentActiveTab, setCurrentActiveTab] = React.useState("Quiz");
  const { isOpen, setIsOpen } = React.useContext(BlurModalContext);
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
  const handleListItemClick = (id, e) => {
    console.log(e.currentTarget);
    setRightSideContent(id);
    setCurrentActiveTab(id);
  };
  const signOutModalContent = <div>Sign Out</div>;
  const handleProfileClick = () => {
    setDisplayProfileMenu(!displayProfileMenu);
    setCurrentActiveTab("Profile");
  };

  const openSignPOutModal = () => {
    setIsOpen(true);
    setToggle(!toggle);
  };
  return (
    <div className={styles.Sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Masai Refresh" />
      </div>
      <div className={styles.navContainer}>
        <ul>
          <li
            onClick={(e) => {
              handleListItemClick("Quiz", e);
              history.push("/quiz_topics");
            }}
            className={
              currentActiveTab === "Quiz" ? styles.selected__list_item : ""
            }
          >
            <img
              src="/logos/QuizIcon.svg"
              alt="Quiz"
              className={
                currentActiveTab === "Quiz" ? styles.svg__selected : ""
              }
            />
            <h4 className={currentActiveTab === "Quiz" ? styles.selected : ""}>
              Quiz
            </h4>
          </li>
          <li
            onClick={(e) => {
              handleListItemClick("Practice", e);
              history.push("/practice_topics");
            }}
            className={
              currentActiveTab === "Practice" ? styles.selected__list_item : ""
            }
          >
            <img
              src="/logos/PracticeIcon.svg"
              alt="Practice"
              className={
                currentActiveTab === "Practice" ? styles.svg__selected : ""
              }
            />
            <h4
              className={currentActiveTab === "Practice" ? styles.selected : ""}
            >
              Practice
            </h4>
          </li>
          <li
            onClick={(e) => handleProfileClick(e)}
            className={
              currentActiveTab === "Profile" ? styles.selected__list_item : ""
            }
          >
            <img
              src="/logos/ProfileIcon.svg"
              alt="Profile"
              className={
                currentActiveTab === "Profile" ? styles.svg__selected : ""
              }
            />
            <h4
              className={currentActiveTab === "Profile" ? styles.selected : ""}
            >
              Profile
            </h4>
          </li>
          {displayProfileMenu ? (
            <ul className={styles.Sidebar__profileMenu}>
              <li
                onClick={(e) => {
                  handleListItemClick("MyBookmarks", e);
                  history.push("/my_bookmarks");
                }}
                className={
                  currentActiveTab === "MyBookmarks"
                    ? styles.selected__list_item
                    : ""
                }
              >
                <img
                  src="/logos/BookmarkIcon.svg"
                  alt="MyBookmarks"
                  className={
                    currentActiveTab === "MyBookmarks"
                      ? styles.svg__selected
                      : ""
                  }
                />
                <h4
                  className={
                    currentActiveTab === "MyBookmarks" ? styles.selected : ""
                  }
                >
                  My Bookmarks
                </h4>
              </li>
            </ul>
          ) : (
            ""
          )}
          <li onClick={crnAuth === "google" ? logout : zohoLogout}>
            <img src="/logos/SignOutIcon.svg" alt="SignOut" />
            <h4>Sign Out</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export { Sidebar };
