package com.example.myapplication

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProviders
import com.example.myapplication.Attempt.*
import com.example.myapplication.viewModel.AttemptViewModel
import com.example.myapplication.viewModel.QuestionsDataViewModel
import kotlinx.android.synthetic.main.activity_home.*

class HomeActivity : AppCompatActivity() {
    private lateinit var topicID: String
    private lateinit var token: String
    private lateinit var attemptViewModel: AttemptViewModel
    private lateinit var dataQuestions: DataQuestions

    private lateinit var questionsDataViewModel: QuestionsDataViewModel


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        topicID = intent.getStringExtra("topicId").toString()
        token = intent.getStringExtra("token").toString()
        attemptViewModel = ViewModelProviders.of(this).get(AttemptViewModel::class.java)
        questionsDataViewModel = ViewModelProviders.of(this).get(QuestionsDataViewModel::class.java)
        observeLiveData()
        observeQuestions()
        val postStart = PostStart(5, topicID)
        attemptViewModel.callStartAttemptApi(token, postStart)
    }

    private fun observeQuestions() {
        questionsDataViewModel.questionsLiveData.observe(this,{
            when(it){
                is QuestionsUIModel.Success -> {
                    questionText.text = it.questionData.data?.statement
                    optionOne.text = it.questionData.data?.options?.get(0)?.text.toString()
                    optionTwo.text = it.questionData.data?.options?.get(1)?.text.toString()
                    optionThree.text = it.questionData.data?.options?.get(2)?.text.toString()
                    optionFour.text = it.questionData.data?.options?.get(3)?.text.toString()
                }
            }
        })

    }

    private fun observeLiveData() {
        attemptViewModel.liveData.observe(this, {
            when (it) {
                is AttemptUIModel.Success -> {
                    Log.d("Attempt", it.startQuiz.data?.attemptId.toString())
                    val dataStart : DataStart? = it.startQuiz.data
                    if (dataStart != null) {
                        dataStart.questions?.get(0)?.let { it1 ->
                            dataStart.attemptId?.let { it2 ->
                                dataStart.submissionId?.let { it3 ->
                                    questionsDataViewModel.callQuestionsData(token, it2, it3,
                                        it1
                                    )
                                }
                            }
                        }
                    }

                    Toast.makeText(
                        this,
                        it.startQuiz.data?.attemptId.toString(),
                        Toast.LENGTH_SHORT
                    ).show()


                }
                is AttemptUIModel.Failure -> {
                    Log.d("Attempt", "Failure")
                    Toast.makeText(this, "Failure", Toast.LENGTH_SHORT).show()
                }
            }
        })
    }
}