package com.example.myapplication.model.result_model

import com.google.gson.annotations.SerializedName

data class ResultItem(

    @field:SerializedName("statement")
    val statement: String? = null,

    @field:SerializedName("question_id")
    val questionId: String? = null,

    @field:SerializedName("outcome")
    val outcome: String? = null,

    @field:SerializedName("explanation")
    val explanation: String? = null,

    @field:SerializedName("response")
    val response: String? = null,

    @field:SerializedName("correct")
    val correct: String? = null
)