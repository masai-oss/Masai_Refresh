import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/OTPScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../state/action";
import { Spinner } from "../../Common/Loader";
import { ErrorMessageText } from "./ErrorMessageText";
import { storageEnums } from "../../../Enums/storageEnums";
import OtpInput from "react-otp-input";
import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { SuccessMessageText } from "./SuccessMessageText";
const OTPScreen = () => {
  const history = useHistory();
  // const [otp, setOtp] = React.useState(new Array(4).fill(""));
  const [otp, setOtp] = React.useState("");

  const [elements, setElements] = React.useState([]);
  let {
    email,
    isLoading,
    errorMessageUserVerification,
    userVerif,
    resendOtp,
    errorMessageResendUserVerification,
  } = useSelector((state) => state.authenticationNew);
  const dispatch = useDispatch();
  const [showResendSuccess, setShowResendSuccess] = React.useState(false);
  // const handleChange = (element, index) => {
  //   if (isNaN(element.value)) return false;
  //   setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  //   if (element.nextSibling) {
  //     element.nextSibling.focus();
  //   }
  // };
  const handleChange = (otp) => setOtp(otp);
  // const handleBackSpace = (e, i) => {
  //   if (e.keyCode === 8 && !e.target.value) {
  //     i - 1 >= 0 && elements[i - 1].focus();
  //   }
  // };
  const signUpEmail = getFromStorage(
    storageEnums.SIGN_UP_EMAIL,
    "email not found"
  );
  const resendVerifOtp = () => {
    const data = {
      email: signUpEmail,
    };
    dispatch(authActions.resendOtpProcess(data));
    // history.push("/resend-otp");
  };

  const verifyOtp = (e) => {
    const otpType = otp;
    const data = {
      otp: otpType,
      email: signUpEmail,
    };
    dispatch(authActions.userVerficationProcess(data));
  };

  React.useEffect(() => {
    userVerif && history.push("/sign-in");
  }, [userVerif]);

  React.useEffect(() => {
    resendOtp && setShowResendSuccess(true);
  }, [resendOtp]);
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setOtp(new Array(4).fill(""));
  //   }, 1500);
  // }, [ErrorMessage]);

  if (isLoading) {
    return <Spinner />;
  }

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

        {/* <div className={styles.OTPScreen__Boxes}>
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
        </div> */}
      </>
    );
  };
  let cardContent = (
    <div className={styles.OTPScreen}>
      <p>
        Please enter the OTP sent to <span>{signUpEmail}</span>
      </p>
      {renderOTPBoxes()}
      <button
        // disabled={otp.join("").length === 4 ? false : true}
        disabled={otp.length === 4 ? false : true}
        onClick={verifyOtp}
        className={
          // otp.join("").length < 4
          //   ? styles.OTPScreen__buttonDisabled
          //   : styles.OTPScreen__buttonEnabled
          otp.length < 4
            ? styles.OTPScreen__buttonDisabled
            : styles.OTPScreen__buttonEnabled
        }
      >
        Verify OTP
      </button>
      <p onClick={resendVerifOtp} className={styles.resendOTP}>
        Resend OTP
      </p>
      {showResendSuccess ? (
        <SuccessMessageText message="OTP Sent Successfully!" />
      ) : (
        ""
      )}

      {errorMessageResendUserVerification !== "" &&
        errorMessageResendUserVerification && (
          <ErrorMessageText message={errorMessageResendUserVerification} />
        )}
      {errorMessageUserVerification !== "" && errorMessageUserVerification && (
        <ErrorMessageText message={errorMessageUserVerification} />
      )}
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { OTPScreen };
