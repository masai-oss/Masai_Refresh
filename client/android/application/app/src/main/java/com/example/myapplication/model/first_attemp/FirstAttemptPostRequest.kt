package com.example.myapplication.model.first_attemp

import com.google.gson.annotations.SerializedName

data class FirstAttemptPostRequest(@SerializedName("topic_id")
	val topicId: String? = null,
	@SerializedName("size")
	val size: Int? = null
)