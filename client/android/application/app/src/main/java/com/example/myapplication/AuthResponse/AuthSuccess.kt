package com.example.myapplication

data class AuthSuccess(
	val error: Boolean? = null,
	val message: String? = null,
	val user: User? = null,
	val token: String? = null
)

data class User(
	val role: String? = null,
	val profilePic: String? = null,
	val name: String? = null,
	val id: String? = null,
	val email: String? = null
)

