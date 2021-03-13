package com.example.myapplication

import java.io.Serializable

data class Data(
	val questions: List<String?>? = null,
	val attemptId: String? = null,
	val submissionId: String? = null
)