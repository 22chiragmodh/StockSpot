import React from "react";
import { StatusBar, View } from "react-native";

import { Text } from "tamagui";

import { SearchHeader } from "@/components/general/SearchHeader";
import GainersAndLosers from "@/components/home/GainersAndLosers";
import { TrendingList } from "@/components/home/Trending";
import { useTopGainersAndLosers } from "@/hooks/query";

export default function HomeScreen() {
  const { gainers, losers, isLoading, isError } = useTopGainersAndLosers();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading data!</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F5" }}>
      <SearchHeader />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          padding: 16,
        }}
      >
        <GainersAndLosers />
        <TrendingList />
      </View>
    </View>
  );
}
