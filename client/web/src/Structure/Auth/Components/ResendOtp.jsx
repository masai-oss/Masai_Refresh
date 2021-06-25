import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/OTPScreen.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { authActions } from "../state/action";
const ResendOtp = () => {
  const history = useHistory();
  const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const [elements, setElements] = React.useState([]);
  const { email, otpVerification } = useSelector(
    (state) => state.authenticationNew
  );
  const dispatch = useDispatch();
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
    console.log(otp.join(""));
    const otpType = otp.join("");
    const data = {
      otp: otpType,
      email: email,
    };
    dispatch(authActions.userVerficationProcess(data));
  };
  const renderOTPBoxes = () => {
    return (
      <>
        {otpVerification ? (
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
        Please enter the OTP sent to <span>{email}</span>
      </p>
      {renderOTPBoxes()}
      <button onClick={verifyOtp} className={styles.OTPScreen__buttonDisabled}>
        Verify OTP
      </button>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { ResendOtp };
