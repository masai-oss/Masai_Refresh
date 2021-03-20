package com.example.myapplication.network

import com.example.myapplication.AuthResponse.AuthTask
import com.example.myapplication.AuthSuccess
import com.example.myapplication.model.TopicsModel
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST




interface TopicApi {
    @GET("api/topic/")
     fun getTopics(@Header("Authorization") bearer:String?):Call<TopicsModel>


    @POST("/api/auth/login_user")
    fun postToken(@Body task: AuthTask): Call<AuthSuccess>

//
//    @POST("user/classes")
//    fun addToPlaylist(@Header("Content-Type") content_type: String?, @Body req: RequestModel?
//    ): Call<ResponseModel?>?
}