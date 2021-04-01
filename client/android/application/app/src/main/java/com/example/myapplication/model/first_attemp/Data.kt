package com.example.myapplication.model.first_attemp

import com.google.gson.annotations.SerializedName

data class Data(
	val questions: List<String?>? = null,
	@SerializedName("attempt_id")
	val attemptId: String? = null,
	@SerializedName("submission_id")
	val submissionId: String? = null
)