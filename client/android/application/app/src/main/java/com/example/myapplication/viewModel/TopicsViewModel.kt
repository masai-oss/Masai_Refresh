package com.example.myapplication.viewModel


import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.myapplication.model.TopicsModelUpdated.TopicsModelUpdated
import com.example.myapplication.model.UserUIModel
import com.example.myapplication.repository.TopicsRepository
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class TopicsViewModel : ViewModel(), Callback<TopicsModelUpdated> {

    private val repository = TopicsRepository(this)

    private val mutableLiveData = MutableLiveData<UserUIModel>()

    val liveData: LiveData<UserUIModel> = mutableLiveData

    override fun onResponse(
        call: Call<TopicsModelUpdated>,
        response: Response<TopicsModelUpdated>
    ) {
        response.body()?.let {
            mutableLiveData.value =
                UserUIModel.Success(it.data as List<com.example.myapplication.model.TopicsModelUpdated.DataItem>)
        }
    }


    override fun onFailure(call: Call<TopicsModelUpdated>, t: Throwable) {
        mutableLiveData.value = UserUIModel.Failure(t.message!!)
    }


    fun callAPI(tokenId: String) {
        repository.getListOfTopics(tokenId)
    }

}