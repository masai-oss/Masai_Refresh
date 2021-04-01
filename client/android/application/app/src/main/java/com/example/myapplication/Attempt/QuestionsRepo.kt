package com.example.myapplication.Attempt

import com.example.myapplication.network.Network
import com.example.myapplication.network.TopicApi
import retrofit2.Callback

class QuestionsRepo(private val callback: Callback<ResponseQuestionData>) {

    fun getQuestionsData(
        token: String,
        attemptId: String,
        submissionId: String,
        questionId: String
    ) {
        val api = Network.getInstance().create(TopicApi::class.java)

        val call = api.getQuestionData(token, attemptId, submissionId, questionId)
        call.enqueue(callback)

    }
}