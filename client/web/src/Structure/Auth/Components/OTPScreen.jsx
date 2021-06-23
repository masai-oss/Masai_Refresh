import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/OTPScreen.module.css";
import { useHistory } from "react-router-dom";
const OTPScreen = () => {
  const history = useHistory();
  const [otp, setOtp] = React.useState(new Array(4).fill(""));
  const [elements, setElements] = React.useState([]);
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
  const renderOTPBoxes = () => {
    return (
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
    );
  };
  let cardContent = (
    <div className={styles.OTPScreen}>
      <p>
        Please enter the OTP sent to <span>nikhil@masai.school</span>
      </p>
      {renderOTPBoxes()}
      <button className={styles.OTPScreen__buttonDisabled}>Verify OTP</button>
      <p>Resend OTP</p>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { OTPScreen };
/* <p>OTP Entered - {otp.join("")}</p>
        <p>
          <button onClick={(e) => setOtp([...otp.map((v) => "")])}>
            Clear
          </button>
          <button onClick={(e) => alert("Entered OTP is " + otp.join(""))}>
            Verify OTP
          </button>
        </p>  */
