import React from "react";
import { FlatList, View } from "react-native";

import { Text } from "tamagui";
import { Button } from "tamagui";

import { StockCard } from "@/components/home/StockCard";
import { SearchHeader } from "@/components/general/SearchHeader";
import { useTopGainersAndLosers } from "@/hooks/query";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const { gainers, losers, isLoading, isError } = useTopGainersAndLosers();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading data!</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F5" }}>
      <StatusBar />
      <SearchHeader title="Hii" />
      <FlatList
        data={gainers}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <StockCard
            ticker={item.ticker}
            companyName={item.ticker}
            price={Number(item.price)}
            priceChange={Number(item.change_amount)}
            priceChangePercentage={Number(item.change_percentage)}
          />
        )}
      />
      <Button theme="blue">Hello world</Button>
    </View>
  );
}
