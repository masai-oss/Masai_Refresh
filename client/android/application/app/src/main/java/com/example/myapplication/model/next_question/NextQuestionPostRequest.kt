package com.example.myapplication.model.next_question

import java.io.Serializable

data class NextQuestionPostRequest(
	val submissionId: String? = null,
	val attemptId: String? = null
)