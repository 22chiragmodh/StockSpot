import { View, Pressable, useWindowDimensions } from "react-native";
import React from "react";

import { router } from "expo-router";
import { Text } from "react-native-paper";

import { Image } from "expo-image";
import { formatCurrency } from "@/utils/formatCurrenmcy";
export const StockCard = ({
  ticker,
  companyName,
  price,
  priceChange,
  priceChangePercentage,
  image,
}: {
  ticker: string;
  companyName: string;
  price: number;
  priceChange: number;
  priceChangePercentage: number;
  image: string;
}) => {
  const { width } = useWindowDimensions();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 10,
        height: 60,
      }}
      onPress={() => router.push(`/${ticker}`)}
    >
      <Image
        source={image}
        style={{ height: 50, width: 50 }}
        contentFit="contain"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width - 75,
          paddingLeft: 15,
        }}
      >
        <View>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {ticker}
          </Text>
          <Text variant="labelMedium">{companyName}</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {formatCurrency(price)}
          </Text>
          <Text
            variant="labelMedium"
            style={{ color: priceChange < 0 ? "red" : "lightgreen" }}
          >
            {formatCurrency(priceChange)} {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
