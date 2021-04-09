package com.example.myapplication

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.RadioButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.size
import androidx.lifecycle.ViewModelProviders
import br.tiagohm.markdownview.css.ExternalStyleSheet
import br.tiagohm.markdownview.css.InternalStyleSheet
import com.example.myapplication.Attempt.*
import com.example.myapplication.viewModel.AttemptViewModel
import kotlinx.android.synthetic.main.activity_home.*

class HomeActivity : AppCompatActivity() {
    private lateinit var topicID: String
    private lateinit var token: String
    private lateinit var attemptViewModel: AttemptViewModel
    private lateinit var dataQuestions: DataQuestions
    private var size = 5
    private lateinit var css : InternalStyleSheet
    var count = 0
    private lateinit var launchData: DataStart


    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        topicID = intent.getStringExtra("topicId").toString()
        token = intent.getStringExtra("token").toString()
        attemptViewModel = ViewModelProviders.of(this).get(AttemptViewModel::class.java)
        progressFrameHome.visibility = View.VISIBLE
        observeLiveData()
        observeQuestions()
        val postStart = PostStart(size, topicID)
        attemptViewModel.callStartAttemptApi(token, postStart)
        Onclicks()

    }

    private fun Onclicks() {
        floatnextQstn.setOnClickListener {
            launchQuiz()
            recordResponse()
        }
    }

    private fun recordResponse() {
       var responseId = optionsRadio.checkedRadioButtonId

        val radioButton : RadioButton = findViewById(responseId)
       when(responseId){
           R.id.optionOne -> recordQuiz(0)
       }
        var text = radioButton.text
        Toast.makeText(this,"Response : $text",Toast.LENGTH_SHORT).show()
        optionsRadio.clearCheck()
    }

    private fun recordQuiz(i: Int) {
        Toast.makeText(this,"Option : $i",Toast.LENGTH_SHORT).show()

    }

    private fun observeQuestions() {
        attemptViewModel.questionsLiveData.observe(this, {
            when (it) {
                is QuestionsUIModel.Success -> {
                    questionText.addStyleSheet(ExternalStyleSheet.fromAsset("github.css",null))
                    questionText.loadMarkdown( it.questionData.data?.statement)

                    optionOne.text = it.questionData.data?.options?.get(0)?.text.toString()
                    optionTwo.text = it.questionData.data?.options?.get(1)?.text.toString()
                    optionThree.text = it.questionData.data?.options?.get(2)?.text.toString()
                    optionFour.text = it.questionData.data?.options?.get(3)?.text.toString()

                    progressFrameHome.visibility = View.GONE
                    floatnextQstn.visibility = View.VISIBLE
                    floatPreviousBtn.visibility = View.VISIBLE
                }
            }
        })

    }

    private fun observeLiveData() {
        attemptViewModel.liveData.observe(this, {
            when (it) {
                is AttemptUIModel.Success -> {
                    Log.d("Attempt", it.startQuiz.data?.attemptId.toString())
                    val dataStart: DataStart? = it.startQuiz.data

                    if (dataStart != null) {
                        startQuiz.setOnClickListener {
                            launchData = dataStart
                           launchQuiz()
                            startText.visibility = View.GONE
                            progressFrameHome.visibility = View.VISIBLE

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

    private fun launchQuiz() {


            if (count < size) {






                launchData.questions?.get(count)?.let { it1 ->
                    launchData.attemptId?.let { it2 ->
                        launchData.submissionId?.let { it3 ->
                            attemptViewModel.callQuestionsData(
                                token, it2, it3,
                                it1
                            )
                        }
                    }
                }
                count++

            } else {
                floatnextQstn.text = "Submit"
//                                progressFrameHome.visibility = View.VISIBLE

            }



    }

}