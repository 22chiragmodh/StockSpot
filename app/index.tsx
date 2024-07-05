import React from "react";
import { FlatList, View } from "react-native";

import { Text } from "react-native-paper";

import { StockCard } from "@/components/home/StockCard";
import { useTopGainersAndLosers } from "@/helper/useTopGainersAndLosers";
import { Navbar } from "@/components/Navbar";

export default function HomeScreen() {
  const { gainers, losers, isLoading, isError } = useTopGainersAndLosers();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading data!</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Navbar title="Hii" />
      {/* create tabbar */}
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
            // image={item.image}
          />
        )}
      />
    </View>
  );
}
