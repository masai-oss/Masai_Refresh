import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/OTPScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { authActions } from "../state/action";
import { storageEnums } from "../../../Enums/storageEnums";
import { getFromStorage } from "../../../Utils/localStorageHelper";

import {
  saveToStorage,
  removeFromStorage,
} from "../../../Utils/localStorageHelper";

const ResendOtp = () => {
  let isAuth = getFromStorage(storageEnums.TOKEN, "");
  const [otp, setOtp] = React.useState(new Array(4).fill(""));
  const [elements, setElements] = React.useState([]);
  const { email, resendOtp, errorMessageResendUserVerification, userVerif } =
    useSelector((state) => state.authenticationNew);
  const dispatch = useDispatch();
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const signUpEmail = getFromStorage(
    storageEnums.SIGN_UP_EMAIL,
    "email not found"
  );
  const handleBackSpace = (e, i) => {
    if (e.keyCode === 8 && !e.target.value) {
      i - 1 >= 0 && elements[i - 1].focus();
    }
  };

  const verifyOtp = (e) => {
    const otpType = otp.join("");
    const data = {
      otp: otpType,
      email: signUpEmail,
    };
    dispatch(authActions.userVerficationProcess(data));
  };
  const renderOTPBoxes = () => {
    return (
      <>
        {userVerif ? (
          <Redirect to="/sign-in" />
        ) : (
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
        )}
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
    </div>
  );
  return isAuth ? (
    <Redirect push to="/" />
  ) : (
    <AuthTemplate cardContent={cardContent} />
  );
};

export { ResendOtp };
