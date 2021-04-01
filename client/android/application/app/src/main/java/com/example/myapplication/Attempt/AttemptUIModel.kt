package com.example.myapplication.Attempt


sealed class AttemptUIModel {

    data class Success(val startQuiz: ResponseStart) : AttemptUIModel()

    data class Failure(val error: String) : AttemptUIModel()

}
