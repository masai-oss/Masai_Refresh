package com.example.myapplication.model

sealed class    UserUIModel {
    data class Success(val dateModelList: List<DataItem>):UserUIModel()

    data class Failure(val  error :String):UserUIModel()



}