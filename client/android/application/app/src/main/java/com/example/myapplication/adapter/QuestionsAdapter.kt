package com.example.myapplication.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.myapplication.AnswerClickedListener
import com.example.myapplication.R
import com.example.myapplication.model.next_question.NextQuestionApiResponse
import com.example.myapplication.viewholder.QuestionsViewHolder

class QuestionsAdapter (private var nextQuestionApiResponse: NextQuestionApiResponse,private val answerClickedListener: AnswerClickedListener): RecyclerView.Adapter<QuestionsViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): QuestionsViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.option_layout,parent,false)
        return QuestionsViewHolder(view,answerClickedListener)
    }

    override fun getItemCount(): Int {
        return nextQuestionApiResponse.data?.options?.size!!
    }

    override fun onBindViewHolder(holder: QuestionsViewHolder, position: Int) {
        holder.setDataToUi(nextQuestionApiResponse,position)
    }
    fun updateAdapter(nextQuestionApiResponse: NextQuestionApiResponse){
        this.nextQuestionApiResponse =nextQuestionApiResponse
        notifyDataSetChanged()
    }
}