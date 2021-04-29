package com.example.myapplication.Attempt

import com.example.myapplication.RecordAnswerRequest
import com.example.myapplication.RecordAnswerResponse
import com.example.myapplication.network.Network
import com.example.myapplication.network.TopicApi
import retrofit2.Callback
import retrofit2.http.Body
import retrofit2.http.Header

class RecordAnswerRepo(private val callback: Callback<Any>) {
    fun recordMCQAnswer(token:String,submissionId:String?,attemptId:String?
                        ,questionId:String?,answerType:String?,selected:Int)
    {
        val api = Network.getInstance().create(TopicApi::class.java)

        val call = api.recordAnswer(token, RecordAnswerRequest(submissionId,attemptId,
            questionId,answerType,null,selected))
        call.enqueue(callback as Callback<RecordAnswerResponse>)

    }


    fun recordTFAnswer(token:String,submissionId:String?,attemptId:String?
                       ,questionId:String?,answerType:String?,decision:Boolean)
    {
        val api = Network.getInstance().create(TopicApi::class.java)

        val call = api.recordAnswer(token, RecordAnswerRequest(submissionId,attemptId
            ,questionId,answerType,null,null,decision))
        call.enqueue(callback as Callback<RecordAnswerResponse>)

    }
}