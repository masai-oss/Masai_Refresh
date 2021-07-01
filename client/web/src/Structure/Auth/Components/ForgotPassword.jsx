import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/ForgotPassword.module.css";
import { useHistory } from "react-router-dom";
import { authActions } from "../state/action";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../Common";
import { ErrorMessageText } from "./ErrorMessageText";
import { storageEnums } from "../../../Enums/storageEnums";
import { Redirect } from "react-router-dom";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";
const ForgotPassword = () => {
  let isAuth = getFromStorage(storageEnums.TOKEN, "");
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  let { otpVerification, isLoading, errorMessageForgetPassword } = useSelector(
    (state) => state.authenticationNew
  );
  const resetPassword = () => {
    const data = { email: email };
    dispatch(authActions.forgetPasswordProcess(data));
  };

  React.useEffect(() => {
    saveToStorage(storageEnums.RECOVERY_EMAIL, email);
    if (otpVerification) {
      history.push("/recover-password");
    }
  }, [otpVerification]);

  if (isLoading) {
    return <Spinner />;
  }

  let cardContent = (
    <div className={styles.ForgotPassword}>
      <p>Please enter your email to recover password</p>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <button onClick={resetPassword}>Send OTP</button>
      {errorMessageForgetPassword !== "" && errorMessageForgetPassword && (
        <ErrorMessageText message={errorMessageForgetPassword} />
      )}
    </div>
  );
  return isAuth ? (
    <Redirect push to="/" />
  ) : (
    <AuthTemplate cardContent={cardContent} />
  );
};

export { ForgotPassword };
