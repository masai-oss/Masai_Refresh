import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/CreateNewPassword.module.css";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../state/action";
import { Spinner } from "../../Common/Loader";
import { ErrorMessageText } from "./ErrorMessageText";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";
const CreateNewPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  let isAuth = getFromStorage(storageEnums.TOKEN, "");

  const history = useHistory();
  const dispatch = useDispatch();
  let { email, otp, passwordRecovered, isLoading, errorMessageResetPassword } =
    useSelector((state) => state.authenticationNew);
  React.useEffect(() => {
    setPasswordError("");
    passwordRecovered && history.push("/sign-in");
  }, [passwordRecovered]);

  if (isLoading) {
    return <Spinner />;
  }

  const newPassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Password does not match!");

      errorMessageResetPassword = "";
      return;
    }
    setPasswordError("");
    const data = {
      email: email,
      otp: otp,
      password: password,
    };
    dispatch(authActions.resetPasswordProcess(data));
  };
  let cardContent = (
    <div className={styles.CreateNewPassword}>
      <p>Create a new password</p>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        onChange={(e) => setconfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <button onClick={newPassword}>Change Password</button>
      {passwordError !== "" && <ErrorMessageText message={passwordError} />}
      {errorMessageResetPassword !== "" && errorMessageResetPassword && (
        <ErrorMessageText message={errorMessageResetPassword} />
      )}
    </div>
  );
  return isAuth ? (
    <Redirect push to="/" />
  ) : (
    <AuthTemplate cardContent={cardContent} />
  );
};

export { CreateNewPassword };
