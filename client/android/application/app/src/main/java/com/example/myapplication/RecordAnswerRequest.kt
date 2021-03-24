package com.example.myapplication

import java.io.Serializable

data class RecordAnswerRequest(
	val submissionId: String? = null,
	val attemptId: String? = null,
	val answerType: String? = null,
	val response: String? = null,
	val selected: Int? = null,
	val decision: Boolean? = null
)