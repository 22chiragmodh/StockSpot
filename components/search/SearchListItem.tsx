import React, { CSSProperties } from "react";
import { Pressable, View } from "react-native";

import { router } from "expo-router";
import { H3, H4, Image, Text } from "tamagui";

import { SearchItem, StockData } from "@/types";
import { formatCurrency } from "@/utils/formatCurrenmcy";
import { IconTriangleFilled, IconLivePhoto } from "@tabler/icons-react-native";

import { Skeleton } from "moti/skeleton";
import { useCompanyMetaFromTicker } from "@/hooks/companyMetaData.query";

const ICON_SIZE = 36;
export const SearchListItem = ({ data }: { data: SearchItem }) => {
  const { companyData, isLoadingCompanyData, errorLoadingCompanyData } =
    useCompanyMetaFromTicker(data.symbol);

  return (
    <Pressable
      onPress={() => router.push(`/${data.symbol}`)}
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
            <H4 fontSize={16}>{companyData.name}</H4>
          )}
          <H4 color="#888" fontWeight={400} fontSize={14}>
            {data.symbol}
          </H4>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Text fontSize={15}>{data.type}</Text>
        </View>
      </View>
    </Pressable>
  );
};
