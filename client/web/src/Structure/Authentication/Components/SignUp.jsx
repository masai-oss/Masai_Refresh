import React from "react";

const initData = {
  name: "",
  email: "",
  password: "",
};
const SignUp = () => {
  const [userData, setUserData] = React.useState(initData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(userData);
  };
  const { name, email, password } = userData;

  return (
    <div>
      <input
        placeholder="enter name "
        name="name"
        value={name}
        onChange={handleChange}
        type="text"
      />
      <input
        placeholder="enter email "
        name="email"
        value={email}
        onChange={handleChange}
        type="text"
      />
      <input
        placeholder="enter password "
        name="password"
        type="password"
        value={password}
        onChange={handleChange}
      />
      <button onClick={handleSignUp}>Sign up</button>
    </div>
  );
};

export default SignUp;
