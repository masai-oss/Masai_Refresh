package com.example.myapplication.Attempt

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import kotlinx.android.parcel.Parcelize

@Parcelize
data class PostStart(

	@field:SerializedName("size")
	val size: Int? = null,

	@field:SerializedName("topic_id")
	val topicId: String? = null
) : Parcelable
