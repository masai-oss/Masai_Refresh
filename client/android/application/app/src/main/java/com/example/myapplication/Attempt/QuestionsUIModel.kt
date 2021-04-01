package com.example.myapplication.Attempt

sealed class QuestionsUIModel {

    data class Success(val questionData: ResponseQuestionData) : QuestionsUIModel()

    data class Failure(val error: String) : QuestionsUIModel()
}