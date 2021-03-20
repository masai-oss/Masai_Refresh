package com.example.myapplication.Retrofit

import com.example.myapplication.*
import com.example.myapplication.AuthResponse.AuthTask
import com.example.myapplication.model.first_attemp.FirstAttempApiResponse
import com.example.myapplication.model.first_attemp.FirstAttemptPostRequest
import com.example.myapplication.model.next_question.NextQuestionApiResponse
import com.example.myapplication.model.next_question.NextQuestionPostRequest
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface ApiClient {
    @POST("/api/attempt")
    fun FirstAttemptPost(@Header("Authorization") bearer:String? , @Body firstAttemptPostRequest: FirstAttemptPostRequest): Call<FirstAttempApiResponse>


//    @Headers("Content-Type : application/json")
    @POST("/api/auth/login_user")
    fun postToken(@Body task: AuthTask): Call<AuthSuccess>

    @POST(" /api/attempt/next")
    fun getNextQuestion(@Header("Authorization") bearer:String? ,@Body nextQuestionPostRequest: NextQuestionPostRequest):Call<NextQuestionApiResponse>


    @POST("/api/attempt/record")
    fun recordAnswer(@Header("Authorization") bearer:String?, @Body recordAnswerRequest: RecordAnswerRequest):Call<RecordAnswerResponse>
}