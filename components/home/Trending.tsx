import React from "react";
import { Pressable, useWindowDimensions, View } from "react-native";

import { router } from "expo-router";
import { Button, H2, H3, H6, Text, YGroup, YStack } from "tamagui";

import { formatCurrency } from "@/utils/formatCurrenmcy";
import { useTopGainersAndLosers } from "@/hooks/query";
import { StockData } from "@/types";
import { StockListItem } from "./StockListItem";

export const TrendingList = () => {
  const { trending, isLoading, isError } = useTopGainersAndLosers();

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <H3>Trending Today</H3>
        <Button
          unstyled
          color="#2B77EF"
          onPress={() => router.push("/search")}
        >
          View All
        </Button>
      </View>
      <YStack
        marginTop={16}
        padding={20}
        gap={24}
        alignItems="flex-start"
        width={"100%"}
        backgroundColor="white"
        borderRadius={24}
      >
        {trending.map((item) => (
          <StockListItem data={item} key={item.ticker} />
        ))}
      </YStack>
    </View>
  );
};
