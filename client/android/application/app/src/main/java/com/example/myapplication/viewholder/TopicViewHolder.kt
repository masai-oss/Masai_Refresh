package com.example.myapplication.viewholder

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.myapplication.interface_clickListener.TopicClickListener
import com.example.myapplication.model.DataItem
import kotlinx.android.synthetic.main.item_layout_topics_new.view.*
import kotlinx.android.synthetic.main.topics_item_layout.view.*

class TopicViewHolder(private val view:View,private val listener:TopicClickListener):RecyclerView.ViewHolder(view) {
    val css="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/Css.JPG?alt=media&token=df456e33-bf89-4e53-8bb6-1064844c4035"
    val html="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/Html.PNG?alt=media&token=b992f284-c852-4797-a9b7-5033f27319f4"
    val ds="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/Ds.png?alt=media&token=61902161-4f03-4fd9-b17e-a01d8095448a"
    val react="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/React.JPG?alt=media&token=569b4a08-26da-4933-a4aa-1ecba1d5ad4e"
    val nodejs="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/download.png?alt=media&token=23c3cad9-5ef6-4b70-8129-791b406b2981"
    val express="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/Expressjs.png?alt=media&token=74fc7217-fa8a-4a52-b1ff-f12668bc1d93"

    fun setData(dataItem: DataItem){
        view.apply {
            if(dataItem.name.equals("CSS")){
                Glide.with(ivTopicIcon).load(css).into(ivTopicIcon)
            }else if(dataItem.name.equals("REACT")){
                Glide.with(ivTopicIcon).load(react).into(ivTopicIcon)
            }else if(dataItem.name.equals("HTML")){
                Glide.with(ivTopicIcon).load(html).into(ivTopicIcon)
            }else if(dataItem.name.equals("DS_ALGO")){
                Glide.with(ivTopicIcon).load(ds).into(ivTopicIcon)
            }else if(dataItem.name.equals("NODE_JS")){
                Glide.with(ivTopicIcon).load(nodejs).into(ivTopicIcon)
            }else if(dataItem.name.equals("EXPRESS")){
                Glide.with(ivTopicIcon).load(express).into(ivTopicIcon)
            }

            tvTopicName.text=dataItem.name.toString()
            llTopic_Click.setOnClickListener {
                listener.onItemClicked(adapterPosition,dataItem)
            }
        }
    }

}