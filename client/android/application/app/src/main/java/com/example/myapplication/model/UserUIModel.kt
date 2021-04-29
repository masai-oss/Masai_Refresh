package com.example.myapplication.model

import com.example.myapplication.model.TopicsModelUpdated.DataItem

sealed class UserUIModel {
    data class Success(val dateModelList: List<DataItem>) : UserUIModel()

    data class Failure(val error: String) : UserUIModel()


}