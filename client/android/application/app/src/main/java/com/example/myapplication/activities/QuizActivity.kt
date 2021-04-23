package com.example.myapplication.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.RadioButton
import android.widget.Toast
import androidx.lifecycle.ViewModelProviders
import br.tiagohm.markdownview.css.ExternalStyleSheet
import com.example.myapplication.Attempt.*
import com.example.myapplication.R
import com.example.myapplication.viewModel.AttemptViewModel
import kotlinx.android.synthetic.main.activity_home.*
import kotlinx.android.synthetic.main.activity_quiz.*

class QuizActivity : AppCompatActivity() {

    private lateinit var topicID: String
    private lateinit var token: String
    private lateinit var attemptViewModel: AttemptViewModel
    private lateinit var dataQuestions: DataQuestions
    private var size = 5
    var count = -1
    private lateinit var launchData: DataStart
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz)
        topicID = intent.getStringExtra("topicId").toString()
        token = intent.getStringExtra("token").toString()
        attemptViewModel = ViewModelProviders.of(this).get(AttemptViewModel::class.java)

        observeLiveData()
        observeQuestions()
        val postStart = PostStart(size, topicID)
        attemptViewModel.callStartAttemptApi(token, postStart)
        onclicks()
    }

    private fun onclicks() {
        prevQstnBtn.setOnClickListener {
            launchQuiz(1)

        }


        nextQstnBtn.setOnClickListener {
            if (count == size - 1) {
                Toast.makeText(this,"Quiz Completed",Toast.LENGTH_SHORT).show()
            } else {

                launchQuiz(0)
                recordResponse()
            }
        }
    }

    private fun recordResponse() {
        var responseId = radioGroupOptions.checkedRadioButtonId

        val radioButton: RadioButton = findViewById(responseId)
        when (responseId) {
            R.id.radioOptionOne -> recordQuiz(0)
            R.id.radioOptionTwo -> recordQuiz(1)
            R.id.radioOptionThree -> recordQuiz(2)
            R.id.radioOptionFour -> recordQuiz(3)

        }
        var text = radioButton.text
        Toast.makeText(this, "Response : $text", Toast.LENGTH_SHORT).show()
        radioGroupOptions.clearCheck()
    }
    private fun recordQuiz(i: Int) {
        Toast.makeText(this, "Option : $i", Toast.LENGTH_SHORT).show()

    }

    private fun observeQuestions() {
        attemptViewModel.questionsLiveData.observe(this, {
            when (it) {
                is QuestionsUIModel.Success -> {

                    questionDesTV.text=it.questionData.data?.statement

                    radioOptionOne.text = it.questionData.data?.options?.get(0)?.text.toString()
                    radioOptionTwo.text = it.questionData.data?.options?.get(1)?.text.toString()
                    radioOptionThree.text = it.questionData.data?.options?.get(2)?.text.toString()
                    radioOptionFour.text = it.questionData.data?.options?.get(3)?.text.toString()



                }
            }
        })
    }

    private fun observeLiveData() {


        attemptViewModel.liveData.observe(
            this,{
                when (it) {
                    is AttemptUIModel.Success -> {
                        Log.d("Attempt", it.startQuiz.data?.attemptId.toString())
                        val dataStart: DataStart? = it.startQuiz.data

                        if (dataStart != null) {

                                launchData = dataStart
                                launchQuiz(0)
                                prevQstnBtn.visibility = View.GONE


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
            }
        )
    }
    private fun launchQuiz(btnClicked: Int) {


        if (count < size) {


            if (btnClicked == 0) {
                launchData.questions?.get(++count)?.let { it1 ->

                    launchData.attemptId?.let { it2 ->
                        launchData.submissionId?.let { it3 ->
                            attemptViewModel.callQuestionsData(
                                token, it2, it3,
                                it1
                            )
                        }
                    }
                }

            } else {
                launchData.questions?.get(--count)?.let { it1 ->

                    launchData.attemptId?.let { it2 ->
                        launchData.submissionId?.let { it3 ->
                            attemptViewModel.callQuestionsData(
                                token, it2, it3,
                                it1
                            )
                        }
                    }
                }
            }
            if (count > 0) {
                prevQstnBtn.visibility = View.VISIBLE
            }else if(count ==0){
                prevQstnBtn.visibility = View.GONE
            }
            if (count == size - 1) {
                nextQstnBtn.text = "Submit"

            }

        }


    }
}