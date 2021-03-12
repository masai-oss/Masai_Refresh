import jwt_decode from "jwt-decode";

const IsAdmin = () => {
  let token = localStorage.getItem("token");
  const { admin: isAdmin } = jwt_decode(token);
  return isAdmin;
};

export { IsAdmin };
