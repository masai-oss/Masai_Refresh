package com.example.myapplication.Attempt

import com.google.gson.annotations.SerializedName

data class ResponseRecord(

    @field:SerializedName("error")
    val error: Boolean? = null,

    @field:SerializedName("message")
    val message: String? = null
)
