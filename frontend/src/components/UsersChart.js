import React from "react";
import { ResponsiveLine } from "@nivo/line";

function UsersChart({ data }) {
  // Custom tooltip component
  const CustomTooltip = ({ point }) => (
    <div
      style={{
        background: "white",
        padding: "5px",
        border: "2px solid #666",
        borderRadius: "3px",
      }}
    >
      <p>{point.data.yFormatted} New Users</p>
    </div>
  );

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 0, right: 100, bottom: 50, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Time",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "# of messages",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableArea={true}
      areaOpacity={0.3}
      colors={{ scheme: "nivo" }}
      lineWidth={2}
      pointSize={0}
      curve="monotoneX"
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      tooltip={CustomTooltip} // Set the custom tooltip here
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}

export default UsersChart;
