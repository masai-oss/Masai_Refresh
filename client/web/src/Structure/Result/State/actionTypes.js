// API - /api/quiz/result/:quizId

// -  { 
//        error: false, 
//        result:[
//                   {
//                      "statement" :  one of (MCQ || TF || SHORT) Question,
//                      "outcome" : (SKIPPED/CORRECT/WRONG), "for MCQ || TF || SHORT"
//                      "correct" : "answer", "for MCQ || TF || SHORT"
//                      "response" : "User Response for SHORT || TF || MCQ if skipped will get Skipped",
//                   }
//               ]
//     }

const resultConstant = {
    GET_RESULT_LOADING: "GET_RESULT_LOADING",
    GET_RESULT_SUCCESS: "GET_RESULT_SUCCESS",
    GET_RESULT_FAILURE: "GET_RESULT_FAILURE",
  };
  
export { resultConstant };