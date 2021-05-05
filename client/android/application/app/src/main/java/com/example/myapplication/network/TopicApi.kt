package com.example.myapplication.network

import com.example.myapplication.Attempt.PostStart
import com.example.myapplication.Attempt.ResponseQuestionData
import com.example.myapplication.Attempt.ResponseStart
import com.example.myapplication.AuthResponse.AuthTask
import com.example.myapplication.AuthSuccess
import com.example.myapplication.RecordAnswerRequest
import com.example.myapplication.RecordAnswerResponse
import com.example.myapplication.model.TopicsModelUpdated.TopicsModelUpdated
import com.example.myapplication.model.first_attemp.FirstAttempApiResponse
import com.example.myapplication.model.first_attemp.FirstAttemptPostRequest
import com.example.myapplication.model.next_question.NextQuestionApiResponse
import com.example.myapplication.model.result_model.ResultModel
import retrofit2.Call
import retrofit2.http.*


interface TopicApi {
    @GET("api/topic/summary")
    fun getTopics(@Header("Authorization") bearer: String?): Call<TopicsModelUpdated>


    @POST("/api/attempt/create")
    fun FirstAttemptPost(
        @Header("Authorization") bearer: String?,
        @Body firstAttemptPostRequest: FirstAttemptPostRequest
    ): Call<FirstAttempApiResponse>

    @POST("/api/attempt/create")
    fun StartAttempt(
        @Header("Authorization") bearer: String?,
        @Body postStart: PostStart
    ): Call<ResponseStart>


    //    @Headers("Content-Type : application/json")
    @POST("/api/auth/login_user")
    fun postToken(@Body task: AuthTask): Call<AuthSuccess>


    @GET("/api/attempt/question")
    fun getNextQuestion(
        @Header("Authorization") bearer: String?,
        @Query("attempt_id") attempt_id: String?,
        @Query("submission_id") submission_id: String?,
        @Query("question_id") question_id: String?
    ): Call<NextQuestionApiResponse>

    @GET("/api/attempt/question")
    fun getQuestionData(
        @Header("Authorization") bearer: String?,
        @Query("attempt_id") attempt_id: String?,
        @Query("submission_id") submission_id: String?,
        @Query("question_id") question_id: String?
    ): Call<ResponseQuestionData>

    @PATCH("/api/attempt/record")
    fun recordAnswer(
        @Header("Authorization") bearer: String?,
        @Body request: RecordAnswerRequest
    ): Call<RecordAnswerResponse>


    @GET("/api/attempt/result/{attemptId}")
    fun detailedResult(
        @Path("attemptId") attempt_id: String?,
        @Header("Authorization") bearer: String?
    ): Call<ResultModel>


//
//    @POST("user/classes")
//    fun addToPlaylist(@Header("Content-Type") content_type: String?, @Body req: RequestModel?
//    ): Call<ResponseModel?>?
}