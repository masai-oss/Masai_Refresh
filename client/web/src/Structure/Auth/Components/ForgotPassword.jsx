import React from "react";
import { AuthTemplate } from "./AuthTemplate";
import styles from "../Styles/ForgotPassword.module.css";
import { useHistory } from "react-router-dom";
const ForgotPassword = () => {
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

  let cardContent = (
    <div className={styles.ForgotPassword}>
      <p>Please enter your email to recover password</p>

      <button>Send OTP</button>
    </div>
  );
  return <AuthTemplate cardContent={cardContent} />;
};

export { ForgotPassword };
