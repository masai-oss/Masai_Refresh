package com.example.myapplication.activities;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.myapplication.R;


import java.util.ArrayList;

public class Result_Chart extends AppCompatActivity {
//    private static String TAG = "Result_Chart";
//    PieChart pieChart;
//    private float[] yData = {33.33f, 33.33f, 33.33f};
//    private String[] xData = {"Correct", "Incorrect", "Skipped"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result__chart);
//        Log.d(TAG, "onCreate: starting to create chart");
//
//        pieChart = (PieChart) findViewById(R.id.piechart);
//        pieChart.setRotationEnabled(true);
//        //pieChart.setUsePercentValues(true);
//        //pieChart.setHoleColor(Color.BLUE);
//        //pieChart.setCenterTextColor(Color.BLACK);
//        pieChart.setHoleRadius(25f);
//        pieChart.setTransparentCircleAlpha(0);
//        pieChart.setCenterText("JAVASCRIPT");
//        pieChart.setCenterTextSize(8);
//
//
//        addDataSet();
//
//        pieChart.setOnChartValueSelectedListener(new OnChartValueSelectedListener() {
//            @Override
//            public void onValueSelected(Entry e, Highlight h) {
//                Log.d(TAG, "onValueSelected: Value select from chart.");
//                Log.d(TAG, "onValueSelected: " + e.toString());
//                Log.d(TAG, "onValueSelected: " + h.toString());
//
//                int pos1 = e.toString().indexOf("(sum): ");
//                String sales = e.toString().substring(pos1 + 3);
//
//                for (int i = 0; i < yData.length; i++) {
//                    if (yData[i] == Float.parseFloat(sales)) {
//                        pos1 = i;
//                        break;
//                    }
//                }
//                String employee = xData[pos1 + 1];
//                Toast.makeText(Result_Chart.this, "Employee " + employee + "\n" + "Sales: $" + sales + "K", Toast.LENGTH_LONG).show();
//            }
//
//            @Override
//            public void onNothingSelected() {
//
//            }
//        });
//
//    }
//
//    private void addDataSet() {
//
//        Log.d(TAG, "addDataSet started");
//        ArrayList<PieEntry> yEntrys = new ArrayList<>();
//        ArrayList<String> xEntrys = new ArrayList<>();
//
//        for (int i = 0; i < yData.length; i++) {
//            yEntrys.add(new PieEntry(yData[i], i));
//        }
//
//        for (int i = 1; i < xData.length; i++) {
//            xEntrys.add(xData[i]);
//        }
//
//        PieDataSet pieDataSet = new PieDataSet(yEntrys, "Employee Sales");
//        pieDataSet.setSliceSpace(2);
//        pieDataSet.setValueTextSize(12);
//
//        ArrayList<Integer> colors = new ArrayList<>();
//        colors.add(Color.GRAY);
//        colors.add(Color.BLUE);
//        colors.add(Color.RED);
//        colors.add(Color.GREEN);
//        colors.add(Color.CYAN);
//        colors.add(Color.YELLOW);
//        colors.add(Color.MAGENTA);
//
//        pieDataSet.setColors(colors);
//
//        Legend legend = pieChart.getLegend();
//        legend.setForm(Legend.LegendForm.CIRCLE);
////        legend.setPosition(Legend.LegendPosition.LEFT_OF_CHART);
//
//        PieData pieData = new PieData(pieDataSet);
//        pieChart.setData(pieData);
//        pieChart.invalidate();
//    }

    }
}
