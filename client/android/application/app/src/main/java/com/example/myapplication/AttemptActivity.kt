package com.example.myapplication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.myapplication.Retrofit.ApiClient
import com.example.myapplication.Retrofit.Network
import com.example.myapplication.adapter.QuestionsAdapter
import com.example.myapplication.model.first_attemp.FirstAttempApiResponse
import com.example.myapplication.model.first_attemp.FirstAttemptPostRequest
import com.example.myapplication.model.next_question.NextQuestionApiResponse
import com.example.myapplication.model.next_question.NextQuestionPostRequest
import kotlinx.android.synthetic.main.activity_attempt.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AttemptActivity : AppCompatActivity() , AnswerClickedListener{

    private lateinit var attempId :String
    private lateinit var submissionID: String
    lateinit var token:String
    private lateinit var questionsAdapter: QuestionsAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_attempt)

        val topicId :String=intent.getStringExtra("topicId")!!
        val size =5
        token = "Bearer "+intent.getStringExtra("token")!!
        getFirstAttempt(topicId,size)
        setRecyclerAdapter()
        initializeClicks()
    }

    private fun initializeClicks() {
        btnNextQuestionAndSubmit.setOnClickListener( {
            getNextQuestion(attempId,submissionID)

        })
    }

    private fun setRecyclerAdapter() {
        questionsAdapter = QuestionsAdapter(NextQuestionApiResponse(),this)
        val layoutManager = LinearLayoutManager(this)
        rvOptions.layoutManager = layoutManager
        rvOptions.adapter = questionsAdapter

    }


    private fun getFirstAttempt(topicId: String, size: Int) {
        var postRequest =
            FirstAttemptPostRequest(
                topicId,
                size
            )
        val apiClient = Network.getInstance().create(ApiClient::class.java)
        apiClient.FirstAttemptPost(token,
            FirstAttemptPostRequest(
                topicId,
                size
            )
        )
            .enqueue(object : Callback <FirstAttempApiResponse>{
                override fun onFailure(call: Call<FirstAttempApiResponse>, t: Throwable) {
                }

                override fun onResponse(
                    call: Call<FirstAttempApiResponse>,
                    response: Response<FirstAttempApiResponse>
                ) {
                    attempId = response.body()?.data?.attemptId!!
                    submissionID= response.body()?.data?.submissionId!!
                    getNextQuestion(attempId,submissionID)
                }

            }
        )
    }

    private fun getNextQuestion(attempId: String?, submissionID: String?) {
        val apiClient = Network.getInstance().create(ApiClient::class.java)
        apiClient.getNextQuestion(token,NextQuestionPostRequest(attempId,submissionID))
            .enqueue(object : Callback <NextQuestionApiResponse>{
                override fun onFailure(call: Call<NextQuestionApiResponse>, t: Throwable) {
                }

                override fun onResponse(
                    call: Call<NextQuestionApiResponse>,
                    response: Response<NextQuestionApiResponse>
                ) {
                    response.body()?.let {
                        updateUIForQuestions(it)
                    }
                }

            }
            )


    }

    private fun updateUIForQuestions(it: NextQuestionApiResponse) {
        questionsAdapter.updateAdapter(it)
        tvQuestion.text = it.data?.statement

    }

    private fun recordNextAnswer(recordAnswerRequest: RecordAnswerRequest){
         val apiClient = Network.getInstance().create(ApiClient::class.java)
         apiClient.recordAnswer(token,recordAnswerRequest).enqueue(object : Callback<RecordAnswerResponse>{
             override fun onFailure(call: Call<RecordAnswerResponse>, t: Throwable) {
             }

             override fun onResponse(
                 call: Call<RecordAnswerResponse>,
                 response: Response<RecordAnswerResponse>
             ) {

             }

         })
     }

    override fun returnAnswer(position: Int) {
        TODO("Not yet implemented")
    }

}