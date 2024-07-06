// import {LineChart} from 'react-native-charts-wrapper';
// import { Path } from "react-native-svg";
// import { AreaChart, Grid } from "react-native-svg-charts";
// import * as shape from "d3-shape";
import { CartesianChart, Line } from "victory-native";

// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from "react-native-chart-kit";
// import { ECharts } from "react-native-echarts-wrapper";

// import { LineChart } from "react-native-gifted-charts";
// import {
//   Chart,
//   Line,
//   Area,
//   HorizontalAxis,
//   VerticalAxis,
// } from "react-native-responsive-linechart";

import React from "react";
import { Dimensions, Pressable, View } from "react-native";

import { Text } from "tamagui";

import { useOverview } from "@/hooks/query";
import { formatCurrency } from "@/utils/formatCurrenmcy";
import { IconTriangleFilled } from "@tabler/icons-react-native";
const ICON_SIZE = 60;

export const StockPriceInfo = ({ ticker }: { ticker: string }) => {
  const { overview, isLoading, isError } = useOverview(ticker);

  const price = "150.00";
  const change_amount = "5.0";
  const change_percentage = "3.45";

  const isPositiveGain = parseFloat(change_amount) > 0;

  const TEMP_DAILY_PRICE_HISTORY = React.useMemo(() => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        date: new Date(new Date().getTime() - i * 1000 * 60 * 60 * 24),
        value: Math.random() * 100 + 1000,
      });
    }
    return data;
  }, []);

  const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }));

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 24,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 4,
            padding: 20,
            paddingVertical: 25,
          }}
        >
          <Text fontSize={28}>{formatCurrency(price)}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Text fontWeight={500} fontSize={16} color="#222">
              {`${isPositiveGain ? "+" : ""}${change_amount}`}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <View
                style={{
                  transform: isPositiveGain
                    ? [{ rotate: "0deg" }]
                    : [{ rotate: "180deg" }],
                  marginBottom: 2,
                }}
              >
                <IconTriangleFilled
                  size={12}
                  color={isPositiveGain ? "#0765EB" : "#E84D75"}
                  fill={isPositiveGain ? "#0765EB" : "#E84D75"}
                />
              </View>
              <Text
                style={{
                  color: isPositiveGain ? "#0765EB" : "#E84D75",
                }}
                fontWeight={400}
                opacity={0.7}
                fontSize={16}
              >
                {change_percentage}%
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: "column",
          height: 400,
          width: "100%",
          // position: "relative",
        }}
      > */}
      {/* <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          style={{
            padding: 0,
            margin: 0,
            position: "relative",
          }}
          height={300}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withDots={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "rgba(255, 255, 255, 0)",
            backgroundGradientTo: "rgba(255, 255, 255, 0)",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1)  => `rgba(13, 98, 235, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(13, 98, 235, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        /> */}

      {/* <ECharts
          option={{
            xAxis: {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: "line",
              },
            ],
          }}
          backgroundColor="rgba(93, 169, 81, 0.3)"
        /> */}
      {/* <LineChart
          data={{
            dataSets: [
              { label: "demo", values: [{ y: 1 }, { y: 2 }, { y: 1 }] },
            ],
          }}
        /> */}
      {/* <AreaChart
          style={{ height: 200 }}
          data={TEMP_DAILY_PRICE_HISTORY.map(item=>item.value)}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: "rgba(134, 65, 244, 0.2)" }}
        >
          <Grid />
          <Line />
        </AreaChart> */}
      {/* <CartesianChart data={DATA} xKey="x" yKeys={["y"]}>
          {({ points }) => (
            //👇 pass a PointsArray to the Line component, as well as options.
            <Line
              points={points.y}
              color="red"
              strokeWidth={3}
              animate={{ type: "timing", duration: 300 }}
            />
          )}
        </CartesianChart> */}
      {/* <Chart
          style={{ height: 200, width: 400 }}
          data={[
            { x: -2, y: 15 },
            { x: -1, y: 10 },
            { x: 0, y: 12 },
            { x: 1, y: 7 },
            { x: 2, y: 6 },
            { x: 3, y: 3 },
            { x: 4, y: 5 },
            { x: 5, y: 8 },
            { x: 6, y: 12 },
            { x: 7, y: 14 },
            { x: 8, y: 12 },
            { x: 9, y: 13.5 },
            { x: 10, y: 18 },
          ]}
          padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
          xDomain={{ min: -2, max: 10 }}
          yDomain={{ min: -4, max: 20 }}
          viewport={{
            size: { width: Dimensions.get("window").width - 40, height: 200 },
            initialOrigin: { x: Dimensions.get("window").width - 40, y: 200 },
          }}
        >
          <Area
            theme={{
              gradient: {
                from: { color: "#44bd32" },
                to: { color: "#44bd32", opacity: 0.2 },
              },
            }}
          />
          <Line
            theme={{
              stroke: { color: "#44bd32", width: 5 },
              scatter: {
                default: { width: 8, height: 8, rx: 4, color: "#44ad32" },
                selected: { color: "red" },
              },
            }}
          />
        </Chart> */}
      {/* 
        <LineChart
          curved
          initialSpacing={0}
          rotateLabel
          data={latestData}
          animateOnDataChange
          hideAxesAndRules
          hideDataPoints
          gradientDirection="vertical"
          startFillColor={"rgb(84,219,234)"}
          endFillColor={"rgb(84,219,234)"}
          startOpacity={0.4}
          endOpacity={0.1}
          color="#07BAD1"
        /> */}
      {/* </View> */}
      <View style={{ height: 300 }}>
        <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
          {/* 👇 render function exposes various data, such as points. */}
          {({ points }) => (
            // 👇 and we'll use the Line component to render a line path.
            <Line
              points={points.highTmp}
              color="red"
              strokeWidth={3}
              curveType="natural"
              animate
            />
          )}
        </CartesianChart>
      </View>
    </View>
  );
};
