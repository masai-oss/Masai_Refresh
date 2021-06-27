import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/CreateNewPassword.module.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../state/action";
import { Spinner } from "../../Common/Loader";
const CreateNewPassword = () => {
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { email, otp, passwordRecovered, isLoading, ErrorMessage } =
    useSelector((state) => state.authenticationNew);
  React.useEffect(() => {
    passwordRecovered && history.push("/sign-in");
  }, [passwordRecovered]);

  console.log("email:", email);
  if (isLoading) {
    return <Spinner />;
  }

  const newPassword = () => {
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
      <button onClick={newPassword}>Change Password</button>
      {ErrorMessage && <div style={{ color: "red" }}>{ErrorMessage}</div>}
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { CreateNewPassword };
