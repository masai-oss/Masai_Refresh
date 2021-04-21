package com.example.myapplication.model.TopicsModelUpdated

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class DataItem(

	@field:SerializedName("_id")
	val id: String? = null,

	@field:SerializedName("name")
	val name: String? = null,

	@field:SerializedName("icon")
	val icon: String? = null,

	@field:SerializedName("totalNoOfQuestions")
	val totalNoOfQuestions: Int? = null,

	@field:SerializedName("proficiency")
	val proficiency: Any? = null,

	@field:SerializedName("lastAttempt")
	val lastAttempt: LastAttempt? = null
)