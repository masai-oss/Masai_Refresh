package com.example.myapplication.viewholder

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.model.result_model.ResultItem
import kotlinx.android.synthetic.main.result_screen_item_layout.view.*

class DetailedResultsViewHolder(private val view: View) :
    RecyclerView.ViewHolder(view) {

    fun setData(resultItem: ResultItem) {
        view.apply {
            tvQuestionNo.text=resultItem.statement
            tvCorrectAnswer.text = resultItem.correct
            tvYourResponseAnswer.text = resultItem.response
            tvExplanationContent.text = resultItem.explanation

        }
    }
}