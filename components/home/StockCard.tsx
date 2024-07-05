import React, { CSSProperties } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";

import { router } from "expo-router";
import { H3, H4, H6, Image, Text } from "tamagui";

import { StockData } from "@/types";
import { formatCurrency } from "@/utils/formatCurrenmcy";
import { IconTriangle, IconTriangleFilled } from "@tabler/icons-react-native";
import { H2 } from "tamagui";
import { useCompanyMetaFromTicker } from "@/hooks/query";
import { Skeleton } from "moti/skeleton";

export const StockCard = ({ data }: { data: StockData }) => {
  const isPositiveGain = parseFloat(data.change_amount) > 0;
  const ICON_SIZE = 55;

  const { companyData } = useCompanyMetaFromTicker(data.ticker);

  return (
    <Pressable onPress={() => router.push(`/${data.ticker}`)}>
      <View
        style={{
          flexDirection: "column",
          gap: 24,
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 16,
          width: 200,
        }}
      >
        <View
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
          }}
        >
          {companyData?.image ? (
            <Image
              source={{
                uri: companyData.image,
              }}
              borderRadius={ICON_SIZE / 2}
              style={
                {
                  flex: 1,
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  resizeMode: "contain",
                } as CSSProperties
              }
            />
          ) : (
            <Skeleton
              colorMode="light"
              width={ICON_SIZE}
              height={ICON_SIZE}
              radius="round"
            />
          )}
        </View>
        <View>
          <H3 fontSize={19}>{data.ticker}</H3>
          {companyData?.name ? (
            <H4 color="#888" fontWeight={300} fontSize={16}>
              {companyData.name}
            </H4>
          ) : (
            <Skeleton colorMode="light" width={100} height={25} />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text fontSize={16}>{formatCurrency(data.price)}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <View
              style={{
                transform: isPositiveGain
                  ? [{ rotate: "0deg" }]
                  : [{ rotate: "180deg" }],
                marginBottom: 2,
              }}
            >
              <IconTriangleFilled
                size={12}
                color={isPositiveGain ? "#0765EB" : "#E84D75"}
                fill={isPositiveGain ? "#0765EB" : "#E84D75"}
              />
            </View>
            <Text
              style={{
                color: isPositiveGain ? "#0765EB" : "#E84D75",
              }}
              fontWeight={300}
              opacity={0.7}
              fontSize={14}
            >
              {data.change_percentage}%
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
