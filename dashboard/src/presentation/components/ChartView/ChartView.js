import React, { useEffect } from "react";
import { Chart } from "react-google-charts";

import "./ChartView.css";

function ChartView(props) {
  const { chartType, chartData, title, width, height, options } = props;
  return (
    <div className="chart-view-container">
      <h3>{title}</h3>
      <div className={`${chartType + "-container"}`}>
        <Chart
          chartType={chartType}
          data={chartData}
          width={width}
          height={height}
          options={options}
        />
      </div>
    </div>
  );
}

export default ChartView;
