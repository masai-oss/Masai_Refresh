package com.example.myapplication.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.R
import com.example.myapplication.interface_clickListener.TopicClickListener
import com.example.myapplication.viewholder.TopicViewHolder

class TopicAdapter(private var dataModelList: List<com.example.myapplication.model.TopicsModelUpdated.DataItem>,private val listener: TopicClickListener) :
    RecyclerView.Adapter<TopicViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TopicViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.topics_item_layout, parent, false)
        return TopicViewHolder(view,listener)
    }

    override fun onBindViewHolder(holder: TopicViewHolder, position: Int) {
        val dataModel = dataModelList[position]
        holder.setData(dataModel)
    }

    override fun getItemCount(): Int {
        return dataModelList.size
    }

    fun updateList(modelList: List<com.example.myapplication.model.TopicsModelUpdated.DataItem>) {
        dataModelList = modelList
        notifyDataSetChanged()
    }

}