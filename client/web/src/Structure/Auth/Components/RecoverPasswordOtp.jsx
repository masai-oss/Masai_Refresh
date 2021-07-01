import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/OTPScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../state/action";
import { Spinner } from "../../Common/Loader";
import { storageEnums } from "../../../Enums/storageEnums";
import { ErrorMessageText } from "./ErrorMessageText";
import { SuccessMessageText } from "./SuccessMessageText";
import OtpInput from "react-otp-input";
import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";
import { getFromStorage } from "../../../Utils/localStorageHelper";
const RecoverPasswordOtp = () => {
  const history = useHistory();
  const [otp, setOtp] = React.useState("");
  const [elements, setElements] = React.useState([]);
  const {
    email,
    isLoading,
    resetPassOtpVerif,
    resetPassTemp,
    errorMessageResetPasswordOtp,
    otpVerification,
    errorMessageForgetPassword,
  } = useSelector((state) => state.authenticationNew);
  const [showResendSuccess, setShowResendSuccess] = React.useState(false);
  React.useEffect(() => {
    if (resetPassOtpVerif && resetPassTemp) {
      saveToStorage(storageEnums.TEMP_PASS, resetPassTemp);

      history.push("/create-new-password");
    }
  }, [resetPassOtpVerif]);
  const resendOtp = () => {
    const data = { email: recoveryEmail };
    setOtp("");
    dispatch(authActions.forgetPasswordProcess(data));
  };

  React.useEffect(() => {
    otpVerification && setShowResendSuccess(true);
  }, [otpVerification]);

  const dispatch = useDispatch();
  if (isLoading) {
    return <Spinner />;
  }

  const handleChange = (otp) => setOtp(otp);
  const verifyOtp = (e) => {
    dispatch(
      authActions.resetPasswordOtpProcess({
        email: recoveryEmail,
        otp: otp,
      })
    );
  };
  const recoveryEmail = getFromStorage(
    storageEnums.RECOVERY_EMAIL,
    "email not found"
  );

  const renderOTPBoxes = () => {
    return (
      <>
        <div className={styles.OTPScreen__Boxes}>
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={4}
            inputStyle={{
              width: "100%",
              border: "1px solid #ced1d4",
              borderRadius: "4px",
            }}
          />
        </div>
      </>
    );
  };
  let cardContent = (
    <div className={styles.OTPScreen}>
      <p>
        Please enter the OTP sent to <span>{recoveryEmail}</span>
      </p>
      {renderOTPBoxes()}
      <button
        disabled={otp.length === 4 ? false : true}
        onClick={verifyOtp}
        className={
          otp.length < 4
            ? styles.OTPScreen__buttonDisabled
            : styles.OTPScreen__buttonEnabled
        }
      >
        Verify OTP
      </button>
      <p onClick={resendOtp} className={styles.resendOTP}>
        Resend OTP
      </p>
      {showResendSuccess ? (
        <SuccessMessageText message="OTP Sent Successfully!" />
      ) : (
        ""
      )}

      {errorMessageForgetPassword !== "" && errorMessageForgetPassword && (
        <ErrorMessageText message={errorMessageForgetPassword} />
      )}
      {errorMessageResetPasswordOtp !== "" && errorMessageResetPasswordOtp && (
        <ErrorMessageText message={errorMessageResetPasswordOtp} />
      )}
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { RecoverPasswordOtp };
