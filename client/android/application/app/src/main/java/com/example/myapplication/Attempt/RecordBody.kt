package com.example.myapplication.Attempt

import com.google.gson.annotations.SerializedName

data class RecordBody(

    @field:SerializedName("submission_id")
    val submissionId: String? = null,

    @field:SerializedName("answer_type")
    val answerType: String? = null,

    @field:SerializedName("decision")
    val decision: Boolean? = null,

    @field:SerializedName("response")
    val response: String? = null,

    @field:SerializedName("attempt_id")
    val attemptId: String? = null,

    @field:SerializedName("question_id")
    val questionId: String? = null,

    @field:SerializedName("selected")
    val selected: Int? = null
)
