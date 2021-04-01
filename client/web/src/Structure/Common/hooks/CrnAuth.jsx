import jwt_decode from "jwt-decode";
import { getFromStorage } from "../../../Utils/localStorageHelper";
import { storageEnums } from "../../../Enums/storageEnums";

const CrnAuth = () => {
  const token = getFromStorage(storageEnums.TOKEN, null);
  if (token === null) {
    return false;
  }
  const { crnAuth } = jwt_decode(token);
  return crnAuth;
};

export { CrnAuth };
