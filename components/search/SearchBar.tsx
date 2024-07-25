import React, { useCallback } from "react";
import { Pressable, View } from "react-native";

import { router } from "expo-router";
import { Input } from "tamagui";

import { IconArrowLeft } from "@tabler/icons-react-native";
import Constants from "expo-constants";

// function debounce<T extends (...args: any[]) => void>(
//   func: T,
//   delay: number
// ): (...args: Parameters<T>) => void {
//   let timeout: ReturnType<typeof setTimeout>;
//   console.log("recreated");
//   return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }

export const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) => {
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <IconArrowLeft size={28} color="black" />
        </Pressable>
        <Input
          flex={1}
          size={24}
          fontSize={16}
          placeholder="Start typing to search..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
    </View>
  );
};
