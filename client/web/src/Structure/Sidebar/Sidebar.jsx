import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../Assets/logo.svg";
import { BlurModalContext } from "../../ContextProviders/BlurModalContextProvider";
import { BlurModal } from "../Common/DialogBoxes/BlurModal";
import { authActions } from "../Auth/state/action";
import { CustomDialog, CrnAuth } from "../Common";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const GOOGLE_LOGOUT_URL = process.env.REACT_APP_AUTH_GOOGLE_LOGOUT_URL;
const ZOHO_LOGOUT_URL = process.env.REACT_APP_AUTH_ZOHO_LOGOUT_URL;
const LOGOUT_URL = process.env.REACT_APP_AUTH_LOGOUT_URL;

const Sidebar = ({ setRightSideContent }) => {
  const [displayProfileMenu, setDisplayProfileMenu] = React.useState(false);
  const [mouseOnProfileBookmark, setMouseOnProfileBookmark] =
    React.useState(false);

  const [urlOnProfileBookmark, setUrlOnProfileBookmark] = React.useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const crnAuth = CrnAuth();
  const logout = () => {
    window.open(GOOGLE_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  const zohoLogout = () => {
    window.open(ZOHO_LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };

  React.useEffect(() => {
    if (
      window.location.pathname == "/my_bookmarks" ||
      window.location.pathname.includes("/bookmarks")
    ) {
      setUrlOnProfileBookmark(true);
    } else {
      setUrlOnProfileBookmark(false);
    }
  }, [window.location.pathname]);

  const logout_user = () => {
    window.open(LOGOUT_URL, "_self");
    dispatch(authActions.logoutProcess());
  };
  // const handleListItemClick = (id, e) => {
  //
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

          <div
            className={styles.Sidebar__profileParent}
            onMouseOver={() => {
              setMouseOnProfileBookmark(true);
            }}
            onMouseLeave={() => {
              setMouseOnProfileBookmark(false);
            }}
          >
            <li
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
                onClick={() => setMouseOnProfileBookmark(false)}
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
            {mouseOnProfileBookmark || urlOnProfileBookmark ? (
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
          </div>
          <li
            // onClick={crnAuth === "google" ? logout : zohoLogout}
            onClick={logout_user}
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
