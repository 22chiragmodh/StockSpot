import React, { CSSProperties } from "react";
import { Pressable, View } from "react-native";

import { router } from "expo-router";
import { H3, H4, Image, Text } from "tamagui";

import { StockData } from "@/types";
import { formatCurrency } from "@/utils/formatCurrenmcy";
import { IconTriangleFilled, IconLivePhoto } from "@tabler/icons-react-native";
import { useCompanyMetaFromTicker, useHighlights } from "@/hooks/query";
import { Skeleton } from "moti/skeleton";

const ICON_SIZE = 36;
export const StockListItem = ({ data }: { data: StockData }) => {
  const isPositiveGain = parseFloat(data.change_amount) > 0;
  const { companyData, isLoadingCompanyData, errorLoadingCompanyData } =
    useCompanyMetaFromTicker(data.ticker);

  return (
    <Pressable
      onPress={() => router.push(`/${data.ticker}`)}
      style={{
        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
          }}
        >
          {isLoadingCompanyData ? (
            <Skeleton
              colorMode="light"
              width={ICON_SIZE}
              height={ICON_SIZE}
              radius="round"
            />
          ) : errorLoadingCompanyData || !companyData?.image ? (
            <IconLivePhoto size={ICON_SIZE} color="rgba(6,89,233,0.7)" />
          ) : (
            <Image
              source={{
                uri: companyData.image,
              }}
              borderRadius={ICON_SIZE / 2}
              height={ICON_SIZE}
              width={ICON_SIZE}
              style={
                {
                  flex: 1,
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  resizeMode: "contain",
                } as CSSProperties
              }
            />
          )}
        </View>
        <View
          style={{
            marginRight: "auto",
          }}
        >
          {isLoadingCompanyData ? (
            <Skeleton colorMode="light" width={100} height={25} />
          ) : errorLoadingCompanyData || !companyData?.name ? (
            <H4 fontSize={16}>N/A</H4>
          ) : (
            <H4 fontSize={16}>{companyData.ticker}</H4>
          )}
          <H4 color="#888" fontWeight={400} fontSize={14}>
            {data.ticker}
          </H4>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Text fontSize={15}>{formatCurrency(data.price)}</Text>
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
                marginBottom: 1,
              }}
            >
              <IconTriangleFilled
                size={13}
                color={isPositiveGain ? "#0765EB" : "#E84D75"}
                fill={isPositiveGain ? "#0765EB" : "#E84D75"}
              />
            </View>
            <Text
              style={{
                color: isPositiveGain ? "#0765EB" : "#E84D75",
              }}
              fontWeight={400}
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
