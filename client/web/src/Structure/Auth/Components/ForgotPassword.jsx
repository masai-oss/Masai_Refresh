import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/ForgotPassword.module.css";
import { useHistory } from "react-router-dom";
import { authActions } from "../state/action";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../Common";
const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  let { otpVerification, isLoading, ErrorMessage } = useSelector(
    (state) => state.authenticationNew
  );
  const resetPassword = () => {
    const data = { email: email };
    console.log(email);
    dispatch(authActions.forgetPasswordProcess(data));
    history.push("/recover-password");
  };
  React.useEffect(() => {
    otpVerification && history.push("/recover-password");
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
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { ForgotPassword };
