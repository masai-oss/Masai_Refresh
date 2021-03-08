package com.example.myapplication.repository

import com.example.myapplication.model.TopicsModel
import com.example.myapplication.network.Network
import com.example.myapplication.network.TopicApi

class TopicsRepository (private val callback: retrofit2.Callback<TopicsModel>){

    fun getListOfTopics() {
        val apiClient=Network.getInstance().create(TopicApi::class.java)
        val call=apiClient.getTopics("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ")
        call.enqueue(callback)

    }

}