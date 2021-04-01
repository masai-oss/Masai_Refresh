package com.example.myapplication.viewModel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.myapplication.Attempt.AttemptRepository
import com.example.myapplication.Attempt.AttemptUIModel
import com.example.myapplication.Attempt.PostStart
import com.example.myapplication.Attempt.ResponseStart
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AttemptViewModel : ViewModel(), Callback<ResponseStart> {

    private val attemptRepository = AttemptRepository(this)

    private val mutableLiveData = MutableLiveData<AttemptUIModel>()

    val liveData: LiveData<AttemptUIModel> = mutableLiveData


    fun callStartAttemptApi(token: String, postStart: PostStart) {
        attemptRepository.getQuestionsData(token, postStart)
    }

    override fun onResponse(call: Call<ResponseStart>, response: Response<ResponseStart>) {
        response.body()?.let {
            mutableLiveData.value = AttemptUIModel.Success(it as ResponseStart)
        }
    }

    override fun onFailure(call: Call<ResponseStart>, t: Throwable) {
        mutableLiveData.value = AttemptUIModel.Failure(t.message + " Questions Data Error")
    }
}