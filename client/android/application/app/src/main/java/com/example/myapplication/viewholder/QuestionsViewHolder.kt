package com.example.myapplication.viewholder

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.AnswerClickedListener
import com.example.myapplication.model.next_question.OptionsItem
import kotlinx.android.synthetic.main.option_layout.view.*

class QuestionsViewHolder(itemView: View, private val answerClickedListener: AnswerClickedListener) :RecyclerView.ViewHolder(itemView) {
    fun setDataToUi(options: OptionsItem?,position:Int) {
        itemView.apply {
            this.tvOptions.text = options?.text
            cvClickOption.setOnClickListener{
                answerClickedListener.returnAnswer(position)
            }
        }

    }

}