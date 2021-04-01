package com.example.myapplication.Attempt

import com.example.myapplication.network.Network
import com.example.myapplication.network.TopicApi
import retrofit2.Callback

class AttemptRepository(private val callback: retrofit2.Callback<Any>) {

    fun getQuestionsData(token: String, postStart: PostStart) {
        val apiClient = Network.getInstance().create(TopicApi::class.java)

        val call = apiClient.StartAttempt(token, postStart)
        call.enqueue(
            callback as Callback<ResponseStart>
        )
    }

}


