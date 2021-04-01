package com.example.myapplication

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class RecordAnswerRequest(
	@SerializedName("submission_id")
	val submissionId: String? = null,
	@SerializedName("attempt_id")
	val attemptId: String? = null,
	@SerializedName("question_id")
	val questionId :String? = null,
	@SerializedName("answer_type")
	val answerType: String? = null,
	val response: String? = null,
	val selected: Int? = null,
	val decision: Boolean? = null
)