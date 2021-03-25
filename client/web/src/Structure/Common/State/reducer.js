import { ADD_SELECTED_SIDEBAR } from "./actionTypes";

const initState = {
  selected: "",
};

const common = (state = initState, { type, payload }) => {
  switch (type) {
    case ADD_SELECTED_SIDEBAR:
      return {
        ...state,
        selected: payload,
      };
    default:
      return state;
  }
};

export { common }
