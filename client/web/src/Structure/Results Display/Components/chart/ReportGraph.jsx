import React from "react";
import "../../Styles/ReportGraph.css";

const ReportGraph = (props) => {
  const [correct, wrong, skipped] = props.chart_value;
  console.log(props);
  console.log("hi");
  const str = `${(correct / 5) * 100}%  ${(wrong / 5) * 100}%  ${
    (skipped / 5) * 100
  }%`;
  const green_chart = (correct / 10) * (100 - 20.47244);
  const red_chart = 2 * green_chart + (wrong / 10) * (100 - 20.47244);
  const yellow_chart =
    red_chart +
    (wrong / 10) * (100 - 20.47244) +
    (skipped / 10) * (100 - 20.47244);
  return (
    <React.Fragment>
      {correct > 0 && (
        <div
          className="reportchart-graph__box"
          style={{ left: `${10.23622 + green_chart}%`, color: "#65AE91" }}
        >
          {correct}
        </div>
      )}
      {wrong > 0 && (
        <div
          className="reportchart-graph__box"
          style={{ left: `${10.23622 + red_chart}%`, color: "#D57572" }}
        >
          {wrong}
        </div>
      )}
      {skipped > 0 && (
        <div
          className="reportchart-graph__box"
          style={{ left: `${10.23622 + yellow_chart}%`, color: "#F3D464" }}
        >
          {skipped}
        </div>
      )}
      <div
        className="reportchart-graph__parentdiv"
        style={{ gridTemplateColumns: str }}
      >
        <div className="reportchart-graph__childgreen"></div>
        <div className="reportchart-graph__childred"></div>
        <div className="reportchart-graph__childyellow"></div>
      </div>
      <div className="reportgraph__boxes__green"></div>
      <div className="reportgraph__explain__green report__graph_typography">
        Correct
      </div>
      <div className="reportgraph__boxes__red"></div>
      <div className="reportgraph__explain__red report__graph_typography">
        Incorrect
      </div>
      <div className="reportgraph__boxes__skip"></div>
      <div className="reportgraph__explain__skip report__graph_typography">
        Skipped
      </div>
    </React.Fragment>
  );
};

export default ReportGraph;
