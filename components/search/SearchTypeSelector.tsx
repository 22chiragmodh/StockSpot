import Chip from "@/components/general/Chip";
import React from "react";
import { Pressable, View } from "react-native";
import { Text } from "tamagui";

export const SearchTypeSelector = ({
  options,
  currentType,
  setType,
}: {
  options: { label: string; value: string }[];
  currentType: string;
  setType: (type: string) => void;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 12,
        width: "100%",
      }}
    >
      {options.map((option) => (
        <Pressable key={option.value} onPress={() => setType(option.value)}>
          <Chip
            key={option.value}
            color={option.value === currentType ? "#DFEDFE" : "#E8EBEF"}
            style={
              {
                paddingVertical: 6,
                paddingHorizontal: 16,
                textTransform: "uppercase",
              } as object
            }
          >
            <Text
              color={option.value === currentType ? "#2371ED" : "#808992"}
              fontSize={14}
            >
              {option.label
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </Text>
          </Chip>
        </Pressable>
      ))}
    </View>
  );
};
