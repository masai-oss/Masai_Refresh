package com.example.myapplication.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.myapplication.Attempt.QuestionsRepo
import com.example.myapplication.Attempt.QuestionsUIModel
import com.example.myapplication.Attempt.ResponseQuestionData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class QuestionsDataViewModel : ViewModel(), Callback<ResponseQuestionData> {

    private val questionsRepo = QuestionsRepo(this)
    private val mutableQuestionsLiveData = MutableLiveData<QuestionsUIModel>()

     val questionsLiveData: LiveData<QuestionsUIModel> = mutableQuestionsLiveData

    fun callQuestionsData(
        token: String,
        attemptId: String,
        submissionId: String,
        questionId: String
    ) {
        questionsRepo.getQuestionsData(token, attemptId, submissionId, questionId)
    }

    override fun onResponse(
        call: Call<ResponseQuestionData>,
        response: Response<ResponseQuestionData>
    ) {
        response.body()?.let {
            mutableQuestionsLiveData.value = QuestionsUIModel.Success(it as ResponseQuestionData)
        }
    }

    override fun onFailure(call: Call<ResponseQuestionData>, t: Throwable) {
        mutableQuestionsLiveData.value =
            QuestionsUIModel.Failure(t.message + " Question Loading failed")
    }
}