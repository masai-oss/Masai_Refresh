package com.example.myapplication.repository

import com.example.myapplication.model.TopicsModelUpdated.TopicsModelUpdated
import com.example.myapplication.network.Network
import com.example.myapplication.network.TopicApi

class TopicsRepository (private val callback: retrofit2.Callback<TopicsModelUpdated>){

    fun getListOfTopics(tokenId:String) {
        val apiClient=Network.getInstance().create(TopicApi::class.java)
        val call=apiClient.getTopics("Bearer $tokenId")

//        val call=apiClient.getTopics("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGluYXZAbWFzYWlzY2hvb2wuY29tIiwiaWQiOiI2MDUxOWQ4NzlhMzY3NDAwMjJjMWZiYzkiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjE1OTcyMDU5LCJleHAiOjE2MTg1MjgwNTl9.wUPDp03PBOuY4CTVovhaKFQWfQG8E58onvYuvPLWB84")
        call.enqueue(callback)

    }


}