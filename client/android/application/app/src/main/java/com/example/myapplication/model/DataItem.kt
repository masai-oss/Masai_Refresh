package com.example.myapplication.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class DataItem(

	@field:SerializedName("_id")
	val id: String? = null,

	@field:SerializedName("name")
	val name: String? = null,

	@field:SerializedName("icon")
	val icon: String? = null,

	@field:SerializedName("questions")
	val questions: List<QuestionsItem?>? = null
)