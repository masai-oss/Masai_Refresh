import { commonActionTypes } from "./actionTypes";

const initState = {
  selected: "",
};

const common = (state = initState, { type, payload }) => {
  switch (type) {
    case commonActionTypes.ADDSELECTEDSIDEBAR:
      return {
        ...state,
        selected: payload,
      };
    default:
      return state;
  }
};

export { common }
