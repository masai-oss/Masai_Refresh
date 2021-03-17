package com.example.myapplication.interface_clickListener

import com.example.myapplication.model.DataItem

interface TopicClickListener {
    fun onItemClicked(position: Int, dataItem: DataItem)

}
