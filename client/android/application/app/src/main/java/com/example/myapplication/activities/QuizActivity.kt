package com.example.myapplication.activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProviders
import com.example.myapplication.Attempt.*
import com.example.myapplication.R
import com.example.myapplication.viewModel.AttemptViewModel
import kotlinx.android.synthetic.main.activity_quiz.*


class QuizActivity : AppCompatActivity() {

    private lateinit var topicID: String
    private lateinit var token: String
    private lateinit var topicName: String
    private lateinit var attemptViewModel: AttemptViewModel
    private lateinit var dataQuestions: DataQuestions
    private var size = 5
    var count = -1
    var answer =-1
    var questionType: String? = ""
    private lateinit var launchData: DataStart
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz)
        topicID = intent.getStringExtra("topicId").toString()
        token = intent.getStringExtra("token").toString()
        topicName=intent.getStringExtra("topicName").toString()
        attemptViewModel = ViewModelProviders.of(this).get(AttemptViewModel::class.java)

        observeLiveData()
        observeQuestions()
        val postStart = PostStart(size, topicID)
        attemptViewModel.callStartAttemptApi(token, postStart)
        onclicks()
//        val displayMetrics = DisplayMetrics()
//        windowManager.defaultDisplay.getMetrics(displayMetrics)
//        var height = displayMetrics.heightPixels
//        val width = displayMetrics.widthPixels
//        scrollView.layoutParams = ViewGroup.LayoutParams(width, height-300)

    }

    private fun onclicks() {
        checkRadioButton()
        prevQstnBtn.setOnClickListener {
            launchQuiz(1)

        }


        nextQstnBtn.setOnClickListener {

            if (count == size - 1) {
                recordQuiz(answer)
                Toast.makeText(this, "Quiz Completed", Toast.LENGTH_SHORT).show()
                val intent = Intent(this, Results::class.java)
                intent.putExtra("token", token)
                intent.putExtra("attempt_id", launchData.attemptId)
                intent.putExtra("submission_id", launchData.submissionId)
                intent.putExtra("topicName",topicName)
                startActivity(intent)
            } else {
                recordQuiz(answer)
                launchQuiz(0)
            }
            radioGroupOptions.clearCheck()
        }
        skipQstnBtn.setOnClickListener {
            recordQuiz(-1)
            if (count == size - 1) {
                Toast.makeText(this, "Quiz Completed", Toast.LENGTH_SHORT).show()
                val intent = Intent(this, Results::class.java)
                intent.putExtra("token", token)
                intent.putExtra("attempt_id", launchData.attemptId)
                intent.putExtra("submission_id", launchData.submissionId)
                intent.putExtra("topicName",topicName)
                startActivity(intent)
            } else {
                launchQuiz(0)
            }
            radioGroupOptions.clearCheck()
        }
    }

    private fun checkRadioButton() {
        radioGroupOptions.setOnCheckedChangeListener(RadioGroup.OnCheckedChangeListener { radioGroup, i ->
            when (i) {
                R.id.radioOptionOne -> {
                    answer=1

                    Toast.makeText(applicationContext, " Car", Toast.LENGTH_LONG).show()
                }
                R.id.radioOptionTwo -> {
                    answer=2
                    Toast.makeText(applicationContext, " Bike", Toast.LENGTH_LONG).show()
                }
                R.id.radioOptionThree -> {
                    answer=3
                    Toast.makeText(applicationContext, " Car", Toast.LENGTH_LONG).show()
                }
                R.id.radioOptionFour -> {
                    answer=4
                    Toast.makeText(applicationContext, " Bike", Toast.LENGTH_LONG).show()
                }
            }
            if (radioGroupOptions.checkedRadioButtonId==-1){
                nextQstnBtn.visibility = View.GONE

            }else{
                nextQstnBtn.visibility = View.VISIBLE

            }

        })
    }

//    private fun recordResponse() {
//        if(radioGroupOptions.isPressed) {
//            var responseId = radioGroupOptions.checkedRadioButtonId
//
//            val radioButton: RadioButton = findViewById(responseId)
//            when (responseId) {
//                R.id.radioOptionOne -> recordQuiz(0)
//                R.id.radioOptionTwo -> recordQuiz(1)
//                R.id.radioOptionThree -> recordQuiz(2)
//                R.id.radioOptionFour -> recordQuiz(3)
//
//            }
//
//            var text = radioButton.text
//            Toast.makeText(this, "Response : $text", Toast.LENGTH_SHORT).show()
//            radioGroupOptions.clearCheck()
//
//        }
//    }

    private fun recordQuiz(i: Int) {
        when (questionType) {
            "MCQ" -> {
                Toast.makeText(this, "Response : recorded", Toast.LENGTH_SHORT).show()
                attemptViewModel.recordCurrentMCQAnswer(
                    token,
                    launchData.submissionId,
                    launchData.attemptId,
                    launchData.questions?.get(count),
                    questionType,
                    i
                )
            }
            "TF" -> {
                Toast.makeText(this, "Response : recorded", Toast.LENGTH_SHORT).show()
                var answer: Boolean = true
                answer = i == 0
                attemptViewModel.recordCurrentTFAnswer(
                    token,
                    launchData.submissionId,
                    launchData.attemptId,
                    launchData.questions?.get(count),
                    questionType,
                    answer
                )
            }

        }

    }

    private fun observeQuestions() {
        attemptViewModel.questionsLiveData.observe(this, {
            when (it) {
                is QuestionsUIModel.Success -> {

                    questionDesTV.text = it.questionData.data?.statement
                    questionType = it.questionData.data?.type
                    if (questionType.equals("TF")) {
                        radioOptionOne.text = "true"
                        radioOptionTwo.text = "false"

                        radioOptionFour.visibility = View.GONE
                        radioOptionThree.visibility = View.GONE
                    } else {
                        radioOptionOne.text = it.questionData.data?.options?.get(0)?.text.toString()
                        radioOptionTwo.text = it.questionData.data?.options?.get(1)?.text.toString()
                        radioOptionThree.text =
                            it.questionData.data?.options?.get(2)?.text.toString()
                        radioOptionFour.text =
                            it.questionData.data?.options?.get(3)?.text.toString()
                    }
                    if(it.questionData.data?.selected==-1){

                    }else{
                        when(it.questionData.data?.selected){

                        }

                    }


                }
            }
        })
    }

    private fun observeLiveData() {


        attemptViewModel.liveData.observe(
            this, {
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
            } else if (count == 0) {
                prevQstnBtn.visibility = View.GONE
            }
            if (count == size - 1) {
                nextQstnBtn.text = "Submit"

            }

        }


    }
}