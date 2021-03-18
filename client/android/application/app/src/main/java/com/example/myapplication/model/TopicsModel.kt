package com.example.myapplication.model

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class TopicsModel(

	@field:SerializedName("error")
	val error: Boolean? = null,

	@field:SerializedName("data")
	val data: List<DataItem?>? = null
)