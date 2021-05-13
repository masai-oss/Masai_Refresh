package com.example.myapplication.activities;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.GoogleSignInActivty;
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
    TextView tvGoToHomePage, tvLastAttemptCorrect, tvLastAttemptWrong, tvLastAttemptSkipped;
    ImageView tvGoToHomePageIcon;


    //    TextView tvR, tvPython, tvCPP, tvJava;
//    PieChart pieChart;
    int correct = 0;
    int incorrect = 0;
    int skipped = 0;
    private RecyclerView recyclerViewDetails;
    private String attemptId, bearerToken, submissionId, topicName;
    private ResultDetailsAdapter resultDetailsAdapter;
    private List<ResultItem> responseList = new ArrayList<>();

    public Results() {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result__chart);
        inItViews();
        getDataFromIntent();
//        setData();
        callApiResult();
        setRecyclerAdapter();

    }

    private void updateQuizResult() {
        tvLastAttemptCorrect.setText(correct + "");
        tvLastAttemptWrong.setText(incorrect + "");
        tvLastAttemptSkipped.setText(skipped + "");
        Log.d("abhi", "Update");


    }

    private void getDataFromIntent() {

        if (getIntent() != null && getIntent().getExtras() != null) {
            attemptId = getIntent().getStringExtra("attempt_id");
            bearerToken = getIntent().getStringExtra("token");
            submissionId = getIntent().getStringExtra("submission_id");
            topicName = getIntent().getStringExtra("topicName");


        }
    }

    private void setRecyclerAdapter() {
        resultDetailsAdapter = new ResultDetailsAdapter(responseList);
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        recyclerViewDetails.setLayoutManager(layoutManager);
        recyclerViewDetails.setAdapter(resultDetailsAdapter);
        Log.d("abhi", "Adapter");

    }

    private void callApiResult() {
        TopicApi apiService = Network.Companion.getInstance().create(TopicApi.class);
        Call<ResultModel> call = apiService.detailedResult(attemptId, bearerToken);

//        Call<ResultModel> call = apiService.detailedResult("6066c6007bdc750022708e1d", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhaWJoYXZAbWFzYWlzY2hvb2wuY29tIiwiaWQiOiI2MDU1YjRmOTk3MzZmNjAwMjJiYWU0MjAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjE3MzQ4MDg3LCJleHAiOjE2MTk5MDQwODd9.u5tIKscVrZOU1xl9c2DwnG9S0FsUisuWl00QEU1D3Rg");
        call.enqueue(new Callback<ResultModel>() {
            @Override
            public void onResponse(Call<ResultModel> call, Response<ResultModel> response) {


                if (response.code() == HttpURLConnection.HTTP_OK) {
                    assert response.body() != null;
                    responseList = response.body().getResult();
                    resultDetailsAdapter.updateData(responseList);
                    Log.d("abhi", "CallApiBefore");
                    for (int i = 0; i < responseList.size(); i++) {

                        if (Objects.requireNonNull(responseList.get(i).getOutcome()).equals("CORRECT")) {
                            correct++;
                        }
                        if (Objects.requireNonNull(responseList.get(i).getOutcome()).equals("WRONG")) {
                            incorrect++;
                        }
                        if (Objects.requireNonNull(responseList.get(i).getOutcome()).equals("SKIPPED")) {
                            skipped++;

                        }

                    }
                    Log.d("abhi", "CallApiAfter");
                    updateQuizResult();


                }
            }

            @Override
            public void onFailure(Call<ResultModel> call, Throwable t) {
                Toast.makeText(Results.this, "Failed " + t.getMessage(), Toast.LENGTH_SHORT).show();

            }
        });


    }

    private void inItViews() {

        recyclerViewDetails = findViewById(R.id.rvDetailedReportNewLayout);
        tvGoToHomePage = findViewById(R.id.tvGoToHomePage);
        tvGoToHomePageIcon = findViewById(R.id.ivPreviousLogo);
        tvLastAttemptCorrect = findViewById(R.id.tvLastAttemptCorrect);
        tvLastAttemptWrong = findViewById(R.id.tvLastAttemptWrong);
        tvLastAttemptSkipped = findViewById(R.id.tvLastAttemptSkipped);


        tvGoToHomePageIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(Results.this, GoogleSignInActivty.class);
                startActivity(intent);
            }
        });

        tvGoToHomePageIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Results.this, GoogleSignInActivty.class);
                startActivity(intent);

            }
        });

    }

//    private void setData() {
////        tvR.setText(Integer.toString(correct));
//        tvR.setText(Integer.toString(3));
//        tvPython.setText(Integer.toString(1));
//        tvCPP.setText(Integer.toString(1));
//        int total = Integer.parseInt(tvR.getText().toString()) + Integer.parseInt(tvPython.getText().toString()) + Integer.parseInt(tvCPP.getText().toString());
//
//        tvJava.setText(Integer.toString(total));
//
//        pieChart.addPieSlice(
//                new PieModel(
//                        "R",
//                        Integer.parseInt(tvR.getText().toString()),
//                        Color.parseColor("#FFA726")));
//        pieChart.addPieSlice(
//                new PieModel(
//                        "Python",
//                        Integer.parseInt(tvPython.getText().toString()),
//                        Color.parseColor("#66BB6A")));
//        pieChart.addPieSlice(
//                new PieModel(
//                        "C++",
//                        Integer.parseInt(tvCPP.getText().toString()),
//                        Color.parseColor("#EF5350")));
////        pieChart.addPieSlice(
////                new PieModel(
////                        "Java",
////                        Integer.parseInt(tvJava.getText().toString()),
////                        Color.parseColor("#29B6F6")));
//
//
//        pieChart.startAnimation();

}

