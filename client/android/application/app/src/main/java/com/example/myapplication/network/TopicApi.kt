package com.example.myapplication.network

import com.example.myapplication.AuthResponse.AuthTask
import com.example.myapplication.AuthSuccess
import com.example.myapplication.RecordAnswerRequest
import com.example.myapplication.RecordAnswerResponse
import com.example.myapplication.model.TopicsModel
import com.example.myapplication.model.first_attemp.FirstAttempApiResponse
import com.example.myapplication.model.first_attemp.FirstAttemptPostRequest
import com.example.myapplication.model.next_question.NextQuestionApiResponse
import com.example.myapplication.model.next_question.NextQuestionPostRequest
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST




interface TopicApi {
    @GET("api/topic/")
     fun getTopics(@Header("Authorization") bearer:String?):Call<TopicsModel>



    @POST("/api/attempt/create")
    fun FirstAttemptPost(@Header("Authorization") bearer:String? , @Body firstAttemptPostRequest: FirstAttemptPostRequest): Call<FirstAttempApiResponse>


    //    @Headers("Content-Type : application/json")
    @POST("/api/auth/login_user")
    fun postToken(@Body task: AuthTask): Call<AuthSuccess>

    @POST(" /api/attempt/next")
    fun getNextQuestion(@Header("Authorization") bearer:String? ,@Body nextQuestionPostRequest: NextQuestionPostRequest):Call<NextQuestionApiResponse>


    @POST("/api/attempt/record")
    fun recordAnswer(@Header("Authorization") bearer:String?, @Body recordAnswerRequest: RecordAnswerRequest):Call<RecordAnswerResponse>
//
//    @POST("user/classes")
//    fun addToPlaylist(@Header("Content-Type") content_type: String?, @Body req: RequestModel?
//    ): Call<ResponseModel?>?
}