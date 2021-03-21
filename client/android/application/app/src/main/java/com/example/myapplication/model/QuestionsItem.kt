package com.example.myapplication.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class QuestionsItem(

	@field:SerializedName("stats")
	val stats: Stats? = null,

	@field:SerializedName("type")
	val type: String? = null,

	@field:SerializedName("statement")
	val statement: String? = null,

	@field:SerializedName("explanation")
	val explanation: String? = null,

	@field:SerializedName("options")
	val options: List<OptionsItem?>? = null,

	@field:SerializedName("id")
	val id: String? = null
)