package com.example.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.myapplication.activities.Results
import com.example.myapplication.adapter.QuestionsAdapter
import com.example.myapplication.model.first_attemp.FirstAttempApiResponse
import com.example.myapplication.model.first_attemp.FirstAttemptPostRequest
import com.example.myapplication.model.next_question.Data
import com.example.myapplication.model.next_question.NextQuestionApiResponse
import com.example.myapplication.model.next_question.OptionsItem
import com.example.myapplication.network.Network
import com.example.myapplication.network.TopicApi
import kotlinx.android.synthetic.main.activity_attempt.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AttemptActivity : AppCompatActivity() , AnswerClickedListener{

    var attempId :String=""
    var submissionID: String=""
    lateinit var token:String
    var questionIndex =0
    lateinit var firstAttempApiResponse: FirstAttempApiResponse
    lateinit var nextQuestionApiResponse: NextQuestionApiResponse
    var answer =-1
    val size =5
    private lateinit var questionsAdapter: QuestionsAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_attempt)

        val topicId :String=intent.getStringExtra("topicId")!!

        token = intent.getStringExtra("token")!!
        getFirstAttempt(topicId,size)
        setRecyclerAdapter()
        initializeClicks()
    }

    private fun initializeClicks() {
        btnNextQuestion.setOnClickListener {
            if (answer != -1){
                recordNextAnswer(
                    RecordAnswerRequest
                        (submissionID,attempId,firstAttempApiResponse.data?.questions?.get(questionIndex),nextQuestionApiResponse?.data?.type,null,answer,null)
                )
            }
            if (questionIndex<size-1) {
                setRecyclerAdapter()
                getNextQuestion(
                    attempId,
                    submissionID,
                    firstAttempApiResponse.data?.questions?.get(++questionIndex)
                )
            }else{
                val intent = Intent(this, Results::class.java)
                intent.putExtra("token",token)
                intent.putExtra("attempt_id" , attempId)
                intent.putExtra("submission_id",submissionID)
                startActivity(intent)
            }
        }
        btnPreviousQuestion.setOnClickListener {
            setRecyclerAdapter()
            getNextQuestion(
                attempId,
                submissionID,
                firstAttempApiResponse.data?.questions?.get(--questionIndex)
            )
        }
    }

    private fun setRecyclerAdapter() {
        var list : List<OptionsItem?>? = emptyList()
        questionsAdapter = QuestionsAdapter(NextQuestionApiResponse(false, Data("","","", list,false,0)),this)
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

        val apiClient = Network.getInstance().create(TopicApi::class.java)
        apiClient.FirstAttemptPost(token,
            postRequest
        )
            .enqueue(object : Callback <FirstAttempApiResponse>{
                override fun onFailure(call: Call<FirstAttempApiResponse>, t: Throwable) {
                    Toast.makeText(this@AttemptActivity,"Api not called ",Toast.LENGTH_SHORT)
                }

                override fun onResponse(
                    call: Call<FirstAttempApiResponse>,
                    response: Response<FirstAttempApiResponse>
                ) {
                    response?.body()?.let {
                        firstAttempApiResponse = it
                    }
                    attempId = response.body()?.data?.attemptId!!
                    submissionID= response.body()?.data?.submissionId!!
                    getNextQuestion(attempId,submissionID,response?.body()?.data?.questions?.get(questionIndex).toString())
                }

            }
        )
    }

    private fun getNextQuestion(attempId: String?, submissionID: String? ,question:String?) {
        val apiClient = Network.getInstance().create(TopicApi::class.java)

        apiClient.getNextQuestion(token,attempId,submissionID,question)
            .enqueue(object : Callback <NextQuestionApiResponse>{
                override fun onFailure(call: Call<NextQuestionApiResponse>, t: Throwable) {
                }

                override fun onResponse(
                    call: Call<NextQuestionApiResponse>,
                    response: Response<NextQuestionApiResponse>
                ) {
                    response.body()?.let {
                        nextQuestionApiResponse= it
                        updateUIForQuestions(it)

                    }
                }

            }
            )


    }

    private fun updateUIForQuestions(it: NextQuestionApiResponse) {
        questionsAdapter.updateAdapter(it)
        tvQuestion.loadMarkdown(it.data?.statement)
        if(questionIndex==0){
            btnPreviousQuestion.visibility= View.GONE
        }else{
            btnPreviousQuestion.visibility= View.VISIBLE
        }
        if(questionIndex==size-1){
            btnNextQuestion.text = "Submit"
        }else{
            btnNextQuestion.text = "Next"
        }

    }

    private fun recordNextAnswer(recordAnswerRequest: RecordAnswerRequest){
         val apiClient = Network.getInstance().create(TopicApi::class.java)
         apiClient.recordAnswer(token,recordAnswerRequest).enqueue(object : Callback<RecordAnswerResponse>{
             override fun onFailure(call: Call<RecordAnswerResponse>, t: Throwable) {
             }

             override fun onResponse(
                 call: Call<RecordAnswerResponse>,
                 response: Response<RecordAnswerResponse>
             ) {

             }

         })
        answer =-1
     }

    override fun returnAnswer(position: Int) {
        var type = nextQuestionApiResponse?.data?.type
        when(type){
            "MCQ" ->
                answer =position
                "TF" -> answer = position

        }

    }

}