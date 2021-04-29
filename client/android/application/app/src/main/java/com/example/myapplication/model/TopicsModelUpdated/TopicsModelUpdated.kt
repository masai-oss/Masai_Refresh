package com.example.myapplication.model.TopicsModelUpdated

import com.google.gson.annotations.SerializedName

data class TopicsModelUpdated(

    @field:SerializedName("error")
    val error: Boolean? = null,

    @field:SerializedName("data")
    val data: List<DataItem?>? = null
)