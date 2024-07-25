import React from "react";
import { View } from "react-native";

import { router } from "expo-router";
import { Button, H3, YStack } from "tamagui";

import { Skeleton } from "moti/skeleton";
import { StockListItem } from "./StockListItem";
import { useHighlights } from "@/hooks/highlights.query";

export const TrendingList = () => {
  const { trending, isLoadingHighlights } = useHighlights();

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
        <H3 fontSize={19}>Trending Today</H3>
        <Button unstyled color="#2B77EF" onPress={() => router.push("/search")}>
          View All
        </Button>
      </View>

      <YStack
        marginTop={16}
        padding={isLoadingHighlights ? 0 : 16}
        gap={isLoadingHighlights ? 20 : 24}
        alignItems="flex-start"
        width={"100%"}
        backgroundColor={isLoadingHighlights ? "transparent" : "#fff"}
        borderRadius={24}
      >
        {isLoadingHighlights
          ? new Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  height={52}
                  width="100%"
                  colorMode="light"
                  key={index}
                />
              ))
          : trending?.map((item: any) => (
              <StockListItem data={item} key={item.ticker} />
            ))}
      </YStack>
    </View>
  );
};
