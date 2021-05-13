package com.example.myapplication.Attempt

import com.google.gson.annotations.SerializedName

data class ResponseQuestionData(

    @field:SerializedName("data")
    val data: DataQuestions? = null,

    @field:SerializedName("error")
    val error: Boolean? = null
)

data class DataQuestions(

    @field:SerializedName("statement")
    val statement: String? = null,

    @field:SerializedName("options")
    val options: List<OptionsItem?>? = null,

    @field:SerializedName("id")
    val id: String? = null,

    @field:SerializedName("type")
    val type: String? = null,

    @field:SerializedName("isStatsUpdated")
    val isStatsUpdated: Boolean? = null,

    @field:SerializedName("selected")
    val selected: Int? = null
)

data class OptionsItem(

    @field:SerializedName("text")
    val text: String? = null
)
