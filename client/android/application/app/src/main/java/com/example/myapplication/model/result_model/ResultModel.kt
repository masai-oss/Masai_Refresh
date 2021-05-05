package com.example.myapplication.model.result_model

import com.google.gson.annotations.SerializedName

data class ResultModel(

    @field:SerializedName("error")
    val error: Boolean? = null,

    @field:SerializedName("result")
    val result: List<ResultItem?>? = null
)