package com.example.myapplication.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Stats(

	@field:SerializedName("alloted")
	val alloted: Int? = null,

	@field:SerializedName("skipped")
	val skipped: Int? = null,

	@field:SerializedName("correct")
	val correct: Int? = null,

	@field:SerializedName("wrong")
	val wrong: Int? = null
)