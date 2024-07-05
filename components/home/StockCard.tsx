import React from "react";
import { Pressable, useWindowDimensions, View } from "react-native";

import { router } from "expo-router";
import { H2, H3, H6, Text } from "tamagui";

import { formatCurrency } from "@/utils/formatCurrenmcy";
export const StockCard = ({
  ticker,
  companyName,
  price,
  priceChange,
  priceChangePercentage,
}: // image,
{
  ticker: string;
  companyName: string;
  price: number;
  priceChange: number;
  priceChangePercentage: number;
  // image: string;
}) => {
  const { width } = useWindowDimensions();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 15,
        height: 60,
      }}
      onPress={() => router.push(`/${ticker}`)}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width - 30,
        }}
      >
        <View>
          <H3 style={{ fontFamily: "Axiforma" }}>{companyName}</H3>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontWeight: "bold", fontFamily: "Axiforma" }}>
            {formatCurrency(price)}
          </Text>
          <H6
            style={{
              color: priceChange < 0 ? "red" : "lightgreen",
              fontFamily: "Axiforma",
            }}
          >
            {formatCurrency(priceChange)} {priceChangePercentage.toFixed(2)}%
          </H6>
        </View>
      </View>
    </Pressable>
  );
};
