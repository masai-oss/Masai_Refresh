package com.example.myapplication.repository

import com.example.myapplication.model.TopicsModel
import com.example.myapplication.network.Network
import com.example.myapplication.network.TopicApi

class TopicsRepository (private val callback: retrofit2.Callback<TopicsModel>){

    fun getListOfTopics() {
        val apiClient=Network.getInstance().create(TopicApi::class.java)
        val call=apiClient.getTopics("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGluYXZAbWFzYWlzY2hvb2wuY29tIiwiaWQiOiI2MDUxOWQ4NzlhMzY3NDAwMjJjMWZiYzkiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjE1OTYxNDc5LCJleHAiOjE2MTg1MTc0Nzl9.1AyMJ3jpE3ItWP9OamKVWEhH992YuesoEPJG_FofSAc")
        call.enqueue(callback)

    }

}