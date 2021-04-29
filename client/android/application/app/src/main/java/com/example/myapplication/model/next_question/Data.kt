package com.example.myapplication.model.next_question

data class Data(
    val id: String? = null,
    val type: String? = null,
    val statement: String? = null,
    val options: List<OptionsItem?>? = null,
    val isStatsUpdated: Boolean? = null,
    var selected: Int? = null
)