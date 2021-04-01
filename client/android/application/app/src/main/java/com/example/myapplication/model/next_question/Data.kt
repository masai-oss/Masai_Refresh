package com.example.myapplication.model.next_question

import java.io.Serializable

data class Data(
    val id: String? = null,
    val type: String? = null,
    val statement: String? = null,
    val options: List<OptionsItem?>? = null,
    val isStatsUpdated: Boolean? = null,
    var selected: Int? = null
)