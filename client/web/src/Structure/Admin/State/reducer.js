import { adminConstants } from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  isUploadingIcon: false,
  isUploadError: false,
  uploadMessage: "",
  data: [],
  topics: "",
  topicsData: [],
  topicPostedSuccessfully: false,
  topicPostFailed: false,
  errorMessage: "",
  specificTopicData: "",
  questionAddedStatus: false,
  questionDisableStatus: false,
  questionEditStatus: false,
  singleQuestion: "",
  gotQuestionData: "",
  isDisabling: false,
  isVerifying: false,
  isSolvingReport: false,
};

const admin = (state = initState, { type, payload }) => {
  switch (type) {
    case adminConstants.GET_ALL_QUESTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        data: [],
      };
    case adminConstants.GET_ALL_QUESTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleQuestion: "",
        data: payload,
      };
    case adminConstants.GET_ALL_QUESTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case adminConstants.GET_TOPICS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case adminConstants.GET_TOPICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        topics: payload,
      };
    case adminConstants.GET_TOPICS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case adminConstants.GET_QUESTIONS_BY_TOPIC_LOADING:
      return {
        ...state,
        isLoading: true,
        data: [],
      };
    case adminConstants.GET_QUESTIONS_BY_TOPIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleQuestion: "",
        data: payload,
      };
    case adminConstants.GET_QUESTIONS_BY_TOPIC_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case adminConstants.GET_QUESTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case adminConstants.GET_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleQuestion: payload.question[0],
        gotQuestionData: true,
      };
    case adminConstants.GET_QUESTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        gotQuestionData: false,
      };

    case adminConstants.ADD_QUESTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case adminConstants.ADD_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        questionAddedStatus: true,
        errorMessage: payload,
      };
    case adminConstants.ADD_QUESTION_FAILURE:
      return {
        ...state,
        isError: true,
        isLoading: false,
        errorMessage: payload,
        questionAddedStatus: false,
      };

    case adminConstants.DISABLE_QUESTION_LOADING:
      return {
        ...state,
        isDisabling: true,
      };
    case adminConstants.DISABLE_QUESTION_SUCCESS:
      return {
        ...state,
        isDisabling: false,
        errorMessage: payload,
        questionDisableStatus: true,
      };

    case adminConstants.DISABLE_QUESTION_FAILURE:
      return {
        ...state,
        questionDisableStatus: false,
        errorMessage: payload,
        isError: true,
        isDisabling: false,
      };

    case adminConstants.DISABLE_QUESTION_ADJUSTMENT: {
      let new_current = state?.data?.questions?.current?.map((document) => {
        if (document._id === payload) {
          document.disabled = !document.disabled;
          return document;
        } else {
          return document;
        }
      });
      state.data.questions.current = [...new_current];
      return {
        ...state,
      };
    }

    case adminConstants.EDIT_QUESTION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case adminConstants.EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleQuestion: "",
        questionEditStatus: true,
      };
    case adminConstants.EDIT_QUESTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
        isError: true,
        questionEditStatus: false,
      };

    case adminConstants.GET_CRUD_TOPICS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case adminConstants.GET_CRUD_TOPICS_SUCCESS:
      return {
        ...state,
        topicsData: [...payload],
        isLoading: false,
      };
    case adminConstants.GET_CRUD_TOPICS_FAILURE:
      return {
        ...state,
        errorMessage: payload,
        isLoading: false,
      };

    case adminConstants.GET_BY_CRUD_TOPIC_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case adminConstants.GET_BY_CRUD_TOPIC_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleQuestion: "",
        specificTopicData: payload,
      };
    case adminConstants.GET_BY_CRUD_TOPIC_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        specificTopicData: "",
      };
    case adminConstants.UPLOAD_ICON_REQUEST:
      return {
        ...state,
        isUploadingIcon: true,
      };
    case adminConstants.UPLOAD_ICON_SUCCESS:
      return {
        ...state,
        isUploadingIcon: false,
        isUploadError: false,
        uploadMessage: payload.message,
      };
    case adminConstants.UPLOAD_ICON_FAILURE:
      return {
        ...state,
        isUploadingIcon: false,
        isUploadError: true,
        errorMessage: payload,
      };
    case adminConstants.VERIFY_QUESTION_REQUEST:
      return {
        ...state,
        isVerifying: true,
      };
    case adminConstants.VERIFY_QUESTION_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };
    case adminConstants.VERIFY_QUESTION_FAILURE:
      return {
        ...state,
        isVerifying: false,
      };
    case adminConstants.VERIFY_QUESTION_ADJUSTMENT: {
      let new_current = state?.data?.questions?.current?.map((document) => {
        if (document._id === payload) {
          document.verified = !document.verified;
          return document;
        } else {
          return document;
        }
      });
      state.data.questions.current = [...new_current];
      return {
        ...state,
      };
    }

    case adminConstants.SOLVE_REPORT_LOADING:
      return {
        ...state,
        isSolvingReport: true,
      };
    case adminConstants.SOLVE_REPORT_SUCCESS:
      return {
        ...state,
        isSolvingReport: false,
        errorMessage: payload,
      };

    case adminConstants.SOLVE_REPORT_FAILURE:
      return {
        ...state,
        isError: true,
        isSolvingReport: false,
        errorMessage: payload,
      };

    case adminConstants.SOLVE_REPORT_ADJUSTMENT: {
      let { status, report_id, question_id } = payload;
      let new_current = state?.data?.questions?.current?.map((document) => {
        if (document._id === question_id) {
          let new_flag = document.flag?.map((flag) => {
            if (flag._id === report_id) {
              flag.status = status;
            }
            return flag;
          });
          document.flag = [...new_flag];
          console.log(document);
        }
        return document;
      });
      state.data.questions.current = [...new_current];
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export { admin };
