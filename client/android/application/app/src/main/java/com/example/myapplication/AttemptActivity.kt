package com.example.myapplication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.myapplication.Retrofit.ApiClient
import com.example.myapplication.Retrofit.Network
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AttemptActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_attempt)

        val topicId=""
        val size =5
        getFirstAttempt(topicId,size)

    }



    private fun getFirstAttempt(topicId: String, size: Int) {
        var postRequest = FirstAttemptPostRequest(topicId,size)
        val apiClient = Network.getInstance().create(ApiClient::class.java)
        apiClient.FirstAttemptPost(FirstAttemptPostRequest(topicId,size))
            .enqueue(object : Callback <AttemptApiResponse>{
                override fun onFailure(call: Call<AttemptApiResponse>, t: Throwable) {
                }

                override fun onResponse(
                    call: Call<AttemptApiResponse>,
                    response: Response<AttemptApiResponse>
                ) {
                   val attempId = response.body()?.data?.attemptId
                    val submissionID= response.body()?.data?.submissionId
                    getNextQuestion(attempId,submissionID)
                }

            }
        )
    }

    private fun getNextQuestion(attempId: String?, submissionID: String?) {


    }

}