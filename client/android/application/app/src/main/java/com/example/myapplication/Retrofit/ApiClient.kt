package com.example.myapplication.Retrofit

import com.example.myapplication.FirstAttemptPostRequest
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiClient {
    @POST("/api/attempt")
    fun FirstAttemptPost(@Body firstAttemptPostRequest: FirstAttemptPostRequest ): Call<AttemptApiResponse>

}