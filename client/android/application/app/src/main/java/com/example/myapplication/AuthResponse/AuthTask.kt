package com.example.myapplication.AuthResponse

import com.google.gson.annotations.SerializedName

data class AuthTask(

	@field:SerializedName("googleToken")
	val googleToken: String? = null
)
