package com.example.myapplication.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.myapplication.Attempt.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AttemptViewModel : ViewModel(), Callback<Any> {

    private val attemptRepository = AttemptRepository(this)
    private val questionsRepo = QuestionsRepo(this)
    private val recordAnswerRepo = RecordAnswerRepo(this)
    private val mutableQuestionsLiveData = MutableLiveData<QuestionsUIModel>()
    val questionsLiveData: LiveData<QuestionsUIModel> = mutableQuestionsLiveData

    private val mutableLiveData = MutableLiveData<AttemptUIModel>()

    val liveData: LiveData<AttemptUIModel> = mutableLiveData

    fun callQuestionsData(
        token: String,
        attemptId: String,
        submissionId: String,
        questionId: String
    ) {
        questionsRepo.getQuestionsData(token, attemptId, submissionId, questionId)
    }
    fun recordCurrentMCQAnswer(token:String,submissionId:String?,attemptId:String?
                            ,questionId:String?,answerType:String?,selected:Int){
        recordAnswerRepo.recordMCQAnswer(token, submissionId, attemptId,
                    questionId, answerType, selected)
    }
    fun recordCurrentTFAnswer(token:String,submissionId:String?,attemptId:String?
                              ,questionId:String?,answerType:String?,decision:Boolean){
        recordAnswerRepo.recordTFAnswer(token, submissionId, attemptId,
            questionId, answerType, decision)
    }

    fun callStartAttemptApi(token: String, postStart: PostStart) {
        attemptRepository.getQuestionsData(token, postStart)

    }

    override fun onResponse(call: Call<Any>, response: Response<Any>) {
        when (response.body()) {
            is ResponseStart -> {
                val result = response.body() as ResponseStart
                mutableLiveData.value = AttemptUIModel.Success(result)
            }
            is ResponseQuestionData -> {
                mutableQuestionsLiveData.value =
                    QuestionsUIModel.Success(response.body() as ResponseQuestionData)

            }
        }

    }

    override fun onFailure(call: Call<Any>, t: Throwable) {
        mutableLiveData.value = AttemptUIModel.Failure(t.message + " Questions Data Error")

    }

//    override fun onResponse(call: Call<ResponseStart>, response: Response<ResponseStart>) {
//        response.body()?.let {
//            mutableLiveData.value = AttemptUIModel.Success(it as ResponseStart)
//        }
//    }
//
//    override fun onFailure(call: Call<ResponseStart>, t: Throwable) {
//        mutableLiveData.value = AttemptUIModel.Failure(t.message + " Questions Data Error")
//    }
}