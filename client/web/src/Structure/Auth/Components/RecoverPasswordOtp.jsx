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
import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";
import { getFromStorage } from "../../../Utils/localStorageHelper";
const RecoverPasswordOtp = () => {
  const history = useHistory();
  const [otp, setOtp] = React.useState(new Array(4).fill(""));
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
    setOtp(new Array(4).fill(""));
    dispatch(authActions.forgetPasswordProcess(data));
  };

  React.useEffect(() => {
    otpVerification && setShowResendSuccess(true);
  }, [otpVerification]);

  const dispatch = useDispatch();
  if (isLoading) {
    return <Spinner />;
  }
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleBackSpace = (e, i) => {
    if (e.keyCode === 8 && !e.target.value) {
      i - 1 >= 0 && elements[i - 1].focus();
    }
  };

  const verifyOtp = (e) => {
    dispatch(
      authActions.resetPasswordOtpProcess({
        email: recoveryEmail,
        otp: otp.join(""),
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
          {otp.map((data, index) => {
            return (
              <input
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => handleBackSpace(e, index)}
                ref={(n) => (elements[index] = n)}
              />
            );
          })}
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
        disabled={otp.join("").length === 4 ? false : true}
        onClick={verifyOtp}
        className={
          otp.join("").length < 4
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
