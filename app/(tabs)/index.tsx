import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Text } from "react-native-paper";

import { stocks } from "@/data";

import { StockCard } from "@/components/StockCard";
import { useTopGainersAndLosers } from "@/helper/useTopGainersAndLosers";

export default function HomeScreen() {
  const { gainers, losers, isLoading, isError } = useTopGainersAndLosers();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading data!</Text>;

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
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
