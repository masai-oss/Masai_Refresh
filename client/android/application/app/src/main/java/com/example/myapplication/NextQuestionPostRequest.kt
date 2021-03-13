package com.example.myapplication

import java.io.Serializable

data class NextQuestionPostRequest(
	val submissionId: String? = null,
	val attemptId: String? = null
)