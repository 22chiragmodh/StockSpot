import React, { CSSProperties } from "react";
import { Pressable, View } from "react-native";

import { router } from "expo-router";
import { H3, H4, Image } from "tamagui";

import { useCompanyMetaFromTicker } from "@/hooks/query";
import { IconArrowLeft } from "@tabler/icons-react-native";
import Constants from "expo-constants";
import { Skeleton } from "moti/skeleton";

const ICON_SIZE = 60;

export const StockDetailsTopBar = ({ ticker }: { ticker: string }) => {
  const { companyData } = useCompanyMetaFromTicker(ticker);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        marginTop: Constants.statusBarHeight,
      }}
    >
      <View>
        <Pressable onPress={() => router.back()}>
          <IconArrowLeft size={28} color="black" />
        </Pressable>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
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
              height={ICON_SIZE}
              width={ICON_SIZE}
              style={
                {
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
        <View
          style={{
            marginRight: "auto",
          }}
        >
          {companyData?.name ? (
            <H3 fontSize={22}>{companyData.name}</H3>
          ) : (
            <Skeleton colorMode="light" width={100} height={25} />
          )}
          <H4 color="#888" fontWeight={400} fontSize={15}>
            {ticker}
          </H4>
        </View>
      </View>
    </View>
  );
};
