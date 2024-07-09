import React from "react";
import { View } from "react-native";

import { router } from "expo-router";
import { Button, H3, Text, YStack } from "tamagui";

import { useHighlights, useSearchResults } from "@/hooks/query";
import { Skeleton } from "moti/skeleton";
import { SearchListItem } from "./SearchListItem";
import { SearchTermType } from "@/types";
import LottieView from "lottie-react-native";

const LOTTIE_SIZE = 150;
export const SearchResults = ({
  query,
  type,
}: {
  query: string;
  type: SearchTermType | "ALL";
}) => {
  const { searchResults, isLoadingSearchResults, errorLoadingSearchResults } =
    useSearchResults(query);

  if (errorLoadingSearchResults) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
        }}
      >
        <View
          style={{
            height: LOTTIE_SIZE,
            width: LOTTIE_SIZE,
          }}
        >
          <LottieView
            style={{ width: LOTTIE_SIZE, height: LOTTIE_SIZE }}
            source={require("../../assets/lotties/error.json")}
            autoPlay
            loop
          />
        </View>
        <Text fontSize={16} color="#444">
          Failed Loading Search Results
        </Text>
      </View>
    );
  }

  if (!query) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
        }}
      >
        <View
          style={{
            height: LOTTIE_SIZE,
            width: LOTTIE_SIZE,
          }}
        >
          <LottieView
            style={{ width: LOTTIE_SIZE, height: LOTTIE_SIZE }}
            source={require("../../assets/lotties/empty.json")}
            autoPlay
            loop
          />
        </View>
        <Text fontSize={16} color="#444">
          Search for a stock
        </Text>
      </View>
    );
  }

  const filteredResults = searchResults?.filter((item) =>
    type === "ALL" ? true : item.type === type
  );


  if (!isLoadingSearchResults && (!searchResults?.length || !filteredResults?.length) ) {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
        }}
      >
        <View
          style={{
            height: LOTTIE_SIZE,
            width: LOTTIE_SIZE,
          }}
        >
          <LottieView
            style={{ width: LOTTIE_SIZE, height: LOTTIE_SIZE }}
            source={require("../../assets/lotties/empty.json")}
            autoPlay
            loop
          />
        </View>
        <Text fontSize={16} color="#444">
          No Results Found
        </Text>
      </View>
    );
  }


  return (
    <YStack
      marginTop={16}
      gap={isLoadingSearchResults ? 20 : 24}
      alignItems="flex-start"
      width={"100%"}
      borderRadius={24}
    >
      {isLoadingSearchResults
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
        : filteredResults?.map((item) => (
            <SearchListItem data={item} key={item.symbol} />
          ))}
    </YStack>
  );
};
