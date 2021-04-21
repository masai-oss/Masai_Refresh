package com.example.myapplication.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.graphics.Color;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import com.example.myapplication.R;
import com.example.myapplication.adapter.ResultDetailsAdapter;
import com.example.myapplication.model.result_model.ResultItem;
import com.example.myapplication.model.result_model.ResultModel;
import com.example.myapplication.network.Network;
import com.example.myapplication.network.TopicApi;

import org.eazegraph.lib.charts.PieChart;
import org.eazegraph.lib.models.PieModel;

import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Results extends AppCompatActivity {
    private RecyclerView recyclerViewDetails;
    TextView tvR, tvPython, tvCPP, tvJava;
    PieChart pieChart;
    int correct=0;
    int incorrect=0;
    int skipped=0;
    private String attemptId,bearerToken,submissionId;
    private ResultDetailsAdapter resultDetailsAdapter;
    private List<ResultItem> responseList = new ArrayList<>();

    public Results() {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_results);
        inItViews();
        getDataFromIntent();
        setData();
        callApiResult();
        setRecyclerAdapter();

    }

    private void getDataFromIntent() {

        if (getIntent() != null && getIntent().getExtras() != null) {
            attemptId=getIntent().getStringExtra("attempt_id");
            bearerToken=getIntent().getStringExtra("token");
            submissionId=getIntent().getStringExtra("submission_id");

        }
    }

    private void setRecyclerAdapter() {
        resultDetailsAdapter = new ResultDetailsAdapter(responseList);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerViewDetails.setLayoutManager(layoutManager);
        recyclerViewDetails.setAdapter(resultDetailsAdapter);
    }

    private void callApiResult() {
        TopicApi apiService = Network.Companion.getInstance().create(TopicApi.class);
        Call<ResultModel> call = apiService.detailedResult(attemptId, bearerToken);

//        Call<ResultModel> call = apiService.detailedResult("6066c6007bdc750022708e1d", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhaWJoYXZAbWFzYWlzY2hvb2wuY29tIiwiaWQiOiI2MDU1YjRmOTk3MzZmNjAwMjJiYWU0MjAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjE3MzQ4MDg3LCJleHAiOjE2MTk5MDQwODd9.u5tIKscVrZOU1xl9c2DwnG9S0FsUisuWl00QEU1D3Rg");
        call.enqueue(new Callback<ResultModel>() {
            @Override
            public void onResponse(Call<ResultModel> call, Response<ResultModel> response) {


                if (response.code() == HttpURLConnection.HTTP_OK) {
                    responseList = response.body().getResult();
                    resultDetailsAdapter.updateData(responseList);
                    for(int i=0;i<responseList.size();i++){
                        if(Objects.requireNonNull(responseList.get(i).getOutcome()).equals("correct")){
                            correct++;
                        }
                        if(Objects.requireNonNull(responseList.get(i).getOutcome()).equals("wrong")){
                            incorrect++;
                        }
                        if(Objects.requireNonNull(responseList.get(i).getOutcome()).equals("skipped")){
                            skipped++;

                        }
                    }
                }
            }

            @Override
            public void onFailure(Call<ResultModel> call, Throwable t) {
                Toast.makeText(Results.this, "Failed " + t.getMessage(), Toast.LENGTH_SHORT).show();

            }
        });


    }

    private void inItViews() {
        tvR = findViewById(R.id.tvR);
        tvPython = findViewById(R.id.tvPython);
        tvCPP = findViewById(R.id.tvCPP);
        tvJava = findViewById(R.id.tvJava);
        pieChart = findViewById(R.id.piechart);
        recyclerViewDetails=findViewById(R.id.recyclerViewDetails);
    }

    private void setData() {
//        tvR.setText(Integer.toString(correct));
        tvR.setText(Integer.toString(3));
        tvPython.setText(Integer.toString(1));
        tvCPP.setText(Integer.toString(1));
        int total = Integer.parseInt(tvR.getText().toString()) + Integer.parseInt(tvPython.getText().toString()) + Integer.parseInt(tvCPP.getText().toString());

        tvJava.setText(Integer.toString(total));

        pieChart.addPieSlice(
                new PieModel(
                        "R",
                        Integer.parseInt(tvR.getText().toString()),
                        Color.parseColor("#FFA726")));
        pieChart.addPieSlice(
                new PieModel(
                        "Python",
                        Integer.parseInt(tvPython.getText().toString()),
                        Color.parseColor("#66BB6A")));
        pieChart.addPieSlice(
                new PieModel(
                        "C++",
                        Integer.parseInt(tvCPP.getText().toString()),
                        Color.parseColor("#EF5350")));
//        pieChart.addPieSlice(
//                new PieModel(
//                        "Java",
//                        Integer.parseInt(tvJava.getText().toString()),
//                        Color.parseColor("#29B6F6")));


        pieChart.startAnimation();

    }

}