package com.example.myapplication.viewModel


import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.myapplication.model.DataItem
import com.example.myapplication.model.TopicsModel
import com.example.myapplication.model.UserUIModel
import com.example.myapplication.repository.TopicsRepository
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class TopicsViewModel : ViewModel(), Callback<TopicsModel> {

    private val repository = TopicsRepository(this)

    private val mutableLiveData = MutableLiveData<UserUIModel>()

    val liveData: LiveData<UserUIModel> = mutableLiveData

    override fun onResponse(call: Call<TopicsModel>, response: Response<TopicsModel>) {
        response.body()?.let {
            mutableLiveData.value = UserUIModel.Success(it.data as List<DataItem>)
        }
    }


    override fun onFailure(call: Call<TopicsModel>, t: Throwable) {
        mutableLiveData.value = UserUIModel.Failure(t.message!!)
    }


    fun callAPI() {
        repository.getListOfTopics()
    }

}