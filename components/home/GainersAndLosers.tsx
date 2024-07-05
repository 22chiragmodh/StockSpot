import { useHighlights } from "@/hooks/query";
import React, { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import {
  ScrollView,
  Separator,
  SizableText,
  Tabs,
  View,
  XStack,
} from "tamagui";
import { StockCard } from "./StockCard";
import { Skeleton } from "moti/skeleton";

const OPTIONS = [
  {
    label: "Top Gainers",
    value: "gainers",
  },
  {
    label: "Top Losers",
    value: "losers",
  },
];

const GainersAndLosers = () => {
  const [selected, setSelected] = React.useState(OPTIONS[0].value);
  const { gainers, losers, isLoadingHighlights } = useHighlights();

  const listItems = useMemo(() => {
    if (selected === "gainers") {
      return gainers;
    } else {
      return losers;
    }
  }, [selected, gainers, losers]);

  const { width } = useWindowDimensions();
  return (
    <View>
      <Tabs
        value={selected}
        onValueChange={(value) => {
          console.log("value", value);
          setSelected(value);
        }}
        orientation="horizontal"
        flexDirection="column"
        borderRadius={24}
        borderWidth={0}
        overflow="hidden"
      >
        <Tabs.List aria-label="Manage your account" borderRadius={24}>
          {OPTIONS.map((option) => (
            <Tabs.Tab
              key={option.value}
              value={option.value}
              backgroundColor={selected === option.value ? "#E8EBEF" : "white"}
              borderWidth={0}
              borderColor={selected === option.value ? "#E8EBEF" : "#E5E5E5"}
            >
              <SizableText fontFamily="$body">{option.label}</SizableText>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Separator />
        {OPTIONS.map((option) => (
          <Tabs.Content
            key={option.value}
            value={option.value}
            style={{
              width: width - 32,
              marginTop: 16,
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap={12}>
                {isLoadingHighlights
                  ? new Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton height={220} width={200} colorMode="light" />
                      ))
                  : listItems?.map((item) => (
                      <StockCard data={item} key={item.ticker} />
                    ))}
              </XStack>
            </ScrollView>
          </Tabs.Content>
        ))}
      </Tabs>
    </View>
  );
};

export default GainersAndLosers;
