package com.example.myapplication.viewholder

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.myapplication.model.DataItem
import kotlinx.android.synthetic.main.topics_item_layout.view.*

class TopicViewHolder(private val view:View):RecyclerView.ViewHolder(view) {
    val css="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/Css.JPG?alt=media&token=df456e33-bf89-4e53-8bb6-1064844c4035"
    val html="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/Html.PNG?alt=media&token=b992f284-c852-4797-a9b7-5033f27319f4"
    val ds="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/Ds.png?alt=media&token=61902161-4f03-4fd9-b17e-a01d8095448a"
    val react="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/React.JPG?alt=media&token=569b4a08-26da-4933-a4aa-1ecba1d5ad4e"
    val nodejs="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/nodejs.svg?alt=media&token=43bceeda-7f1a-4004-8475-eba6cb75b284"
    val express="https://firebasestorage.googleapis.com/v0/b/splitwise-project.appspot.com/o/expressjs-ar21.svg?alt=media&token=00c2052c-3629-443b-89b6-ab0ea70ee14c"

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
        }
    }

}