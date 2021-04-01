package com.example.myapplication.Attempt

import com.google.gson.annotations.SerializedName

data class ResponseStart(

	@field:SerializedName("data")
	val data: DataStart? = null,

	@field:SerializedName("error")
	val error: Boolean? = null
)

data class DataStart(

	@field:SerializedName("submission_id")
	val submissionId: String? = null,

	@field:SerializedName("questions")
	val questions: List<String?>? = null,

	@field:SerializedName("attempt_id")
	val attemptId: String? = null
)
