package com.example.myapplication.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.R;
import com.example.myapplication.model.result_model.ResultItem;
import com.example.myapplication.model.result_model.ResultModel;
import com.example.myapplication.viewholder.DetailedResultsViewHolder;

import java.util.List;

public class ResultDetailsAdapter extends RecyclerView.Adapter<DetailedResultsViewHolder> {
    private List<ResultItem> resultItemLists;



    public ResultDetailsAdapter(List<ResultItem> resultItems) {
        this.resultItemLists=resultItems;
    }

    @NonNull
    @Override
    public DetailedResultsViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.result_screen_item_layout, parent, false);
        return new DetailedResultsViewHolder(view);

    }

    @Override
    public void onBindViewHolder(@NonNull DetailedResultsViewHolder holder, int position) {
        ResultItem resultItemList=resultItemLists.get(position);
        holder.setData(resultItemList);

    }

    @Override
    public int getItemCount() {
        return resultItemLists.size();
    }

    public void updateData(List<ResultItem> responseList){
        this.resultItemLists = responseList;
        notifyDataSetChanged();
    }
}
