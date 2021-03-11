package com.example.myapplication.Retrofit

import com.example.myapplication.AuthResponse.AuthTask
import com.example.myapplication.AuthSuccess
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

interface ApiClient {


//    @Headers("Content-Type : application/json")
    @POST("/api/auth/login_user")
    fun postToken(@Body task: AuthTask): Call<AuthSuccess>
}