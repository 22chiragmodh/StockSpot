import { useTimeSeriesData } from "@/hooks/query";
import { formatCurrency } from "@/utils/formatCurrenmcy";
import { Circle } from "@shopify/react-native-skia";
import { IconTriangleFilled } from "@tabler/icons-react-native";
import LottieView from "lottie-react-native";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Platform, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import { Text } from "tamagui";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";
import { TabsAdvancedBackground } from "@/components/general/TabsAdvancedDemo";
import { TimeSeriesDataIntervals } from "@/types/api";

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return (
    <>
      <Circle cx={x} cy={y} r={8} color="rgba(6,89,233,0.8)" />
    </>
  );
}

const LOTTIE_SIZE = 150;
const TIME_OPTIONS = Object.entries(TimeSeriesDataIntervals).map(
  ([key, value]) => ({
    label: key,
    value,
  })
);

export const StockPriceInfo = ({ ticker }: { ticker: string }) => {
  const { state, isActive } = useChartPressState({ x: 0, y: { open: 0 } });
  const [activeTimeOption, setActiveTimeOption] = React.useState(
    TIME_OPTIONS[0].value
  );

  const { series, isSeriesLoading, seriesLoadingError } = useTimeSeriesData(
    activeTimeOption,
    "IBM"
  );

  const price = "150.00";
  const change_amount = "5.0";
  const change_percentage = "3.45";
  const isPositiveGain = parseFloat(change_amount) > 0;

  if (isSeriesLoading) {
    return <Skeleton height={400} width="100%" radius={24} colorMode="light" />;
  }

  if (seriesLoadingError || !series?.length) {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 24,
          overflow: "hidden",
          height: 400,
        }}
      >
        <View
          style={{
            height: LOTTIE_SIZE,
            width: LOTTIE_SIZE,
          }}
        >
          <LottieView
            style={{ width: LOTTIE_SIZE, height: LOTTIE_SIZE }}
            source={require("../../assets/lotties/error.json")}
            autoPlay
            loop
          />
        </View>
        <Text>Failed to load chart data</Text>
        {/* <Text color="black">{seriesLoadingError?.toString()}</Text>
        <Text color="black">{series?.length.toString()}</Text>
        <Text color="black">
          {test ? "THIS: " + Object.values(test).toString() : "NA"}
        </Text> */}
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "column",
        gap: 16,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 24,
          overflow: "hidden",
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

        {Platform.OS === "android" || Platform.OS === "ios" ? (
          <View style={{ height: 200, position: "relative" }}>
            <CartesianChart
              data={series}
              xKey="date"
              yKeys={["open"]}
              chartPressState={state as any}
            >
              {({ points, chartBounds }) => (
                <>
                  {isActive ? (
                    <ToolTip x={state.x?.position} y={state.y.open?.position} />
                  ) : null}
                  <Area
                    points={points.open}
                    y0={chartBounds.bottom}
                    animate={{ type: "timing", duration: 300 }}
                    curveType="natural"
                    // color="red"
                    color="rgba(6,89,233,0.2)"
                  />
                  <Line
                    points={points.open}
                    y0={chartBounds.bottom}
                    color="rgba(6,89,233,0.8)"
                    strokeWidth={3}
                    curveType="natural"
                    animate={{ type: "timing", duration: 300 }}
                  />
                </>
              )}
            </CartesianChart>
          </View>
        ) : (
          <View
            style={{
              height: 200,
              position: "relative",
              backgroundColor: "rgba(6,89,233,0.1)",
              padding: 16,
            }}
          >
            <Text>Chart not supported on this platform</Text>
          </View>
        )}
      </View>
      <TabsAdvancedBackground
        currentTab={activeTimeOption}
        setCurrentTab={(tab) =>
          setActiveTimeOption(tab as TimeSeriesDataIntervals)
        }
        data={TIME_OPTIONS}
      />
    </View>
  );
};
