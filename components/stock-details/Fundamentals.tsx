import { useOverview } from "@/hooks/query";
import LottieView from "lottie-react-native";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";
import { H3, Text } from "tamagui";

const LOTTIE_SIZE = 150;

const getReadbleNumbers = (num: number) => {
  if (num > 1000000000) {
    return `${(num / 1000000000).toFixed(2)}B`;
  } else if (num > 1000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  } else if (num > 1000) {
    return `${(num / 1000).toFixed(2)}K`;
  } else {
    return num;
  }
};

export const Fundamentals = ({ ticker }: { ticker: string }) => {
  const { overview, isLoading, isError } = useOverview(ticker as string);

  if (isLoading) {
    return <Skeleton height={340} width="100%" radius={24} colorMode="light" />;
  }

  if (isError || !overview || "Information" in overview) {
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
          height: 340,
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
        <Text>Error Loading Overview</Text>
      </View>
    );
  }

  const fundamentals = {
    left: [
      {
        title: "Market Cap",
        value: `$${getReadbleNumbers(
          parseFloat(overview.MarketCapitalization)
        )}`,
      },
      {
        title: "P/E Ratio",
        value: overview.PERatio,
      },
      {
        title: "P/B Ratio",
        value: overview.PriceToBookRatio,
      },
      {
        title: "Beta",
        value: overview.Beta,
      },
    ],
    right: [
      {
        title: "ROE",
        value: overview.ReturnOnEquityTTM,
      },
      {
        title: "EPS",
        value: overview.EPS,
      },
      {
        title: "Dividend Yield",
        value: overview.DividendYield,
      },
      {
        title: "Book Value",
        value: overview.BookValue,
      },
    ],
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 24,
        overflow: "hidden",
        padding: 18,
        paddingTop: 24,
      }}
    >
      <H3 fontSize={20}>Fundamentals</H3>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {fundamentals.left.map((fundamental) => (
            <View
              key={fundamental.title}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text fontSize={14} opacity={0.8} fontWeight={400}>
                {fundamental.title}
              </Text>
              <Text fontSize={14} fontWeight={600}>
                Value:{" "}
                {fundamental.value === null ||
                fundamental.value === undefined ||
                fundamental.value === "None"
                  ? "N/A"
                  : fundamental.value}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {fundamentals.right.map((fundamental) => (
            <View
              key={fundamental.title}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text fontSize={14} opacity={0.8} fontWeight={400}>
                {fundamental.title}
              </Text>
              <Text fontSize={14} fontWeight={600}>
                Value:{" "}
                {fundamental.value === null ||
                fundamental.value === undefined ||
                fundamental.value === "None"
                  ? "N/A"
                  : fundamental.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
