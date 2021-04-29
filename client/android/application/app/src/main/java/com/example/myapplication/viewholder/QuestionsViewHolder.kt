package com.example.myapplication.viewholder

import android.annotation.SuppressLint
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.AnswerClickedListener
import com.example.myapplication.R
import com.example.myapplication.model.next_question.NextQuestionApiResponse
import kotlinx.android.synthetic.main.option_layout.view.*

class QuestionsViewHolder(
    itemView: View,
    private val answerClickedListener: AnswerClickedListener
) : RecyclerView.ViewHolder(itemView) {
    @SuppressLint("ResourceAsColor")
    fun setDataToUi(nextQuestionApiResponse: NextQuestionApiResponse, position: Int) {
        itemView.apply {
            this.tvOptions.text = nextQuestionApiResponse?.data?.options?.get(position)?.text
            if (nextQuestionApiResponse?.data?.selected == null) {
                cvClickOption.setOnClickListener {
                    it.setBackgroundColor(R.color.selected)
                    answerClickedListener.returnAnswer(position)
                }
            } else {
                if (position == nextQuestionApiResponse?.data?.selected) {
                    cvClickOption.setBackgroundColor(R.color.selected)
                }
            }
        }

    }

}