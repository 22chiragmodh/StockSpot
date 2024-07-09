import Chip from "@/components/general/Chip";
import { useOverview } from "@/hooks/query";
import LottieView from "lottie-react-native";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";
import { H3, Text } from "tamagui";

const LOTTIE_SIZE = 150;

export const StockOverview = ({ ticker }: { ticker: string }) => {
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
      <H3 fontSize={20}>{ticker} Overview</H3>
      <View style={{ gap: 12, flexDirection: "row", flexWrap: "wrap" }}>
        <Chip color="#DFEDFF">
          <Text fontSize={14} color="#005DEA">
            {overview.Exchange}
          </Text>
        </Chip>
        <Chip color="#FEEFDB">
          <Text fontSize={14} color="#FE8700">
            {overview.Sector}
          </Text>
        </Chip>
        <Chip color="rgba(236,99,132,0.1)">
          <Text fontSize={14} color="rgb(236,99,132)">
            {overview.Industry}
          </Text>
        </Chip>
      </View>
      <Text color="#666" fontWeight={400} fontSize={14} lineHeight={20}>
        {overview.Description}
      </Text>
    </View>
  );
};
