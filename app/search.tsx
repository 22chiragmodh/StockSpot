import { TabsAdvancedBackground } from "@/components/general/TabsAdvancedDemo";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchTypeSelector } from "@/components/search/SearchTypeSelector";
import { SearchTermType } from "@/types";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "tamagui";

const OPTIONS = [
  { label: "All", value: "ALL" },
  ...Object.entries(SearchTermType).map(([key, value]) => ({
    label: value,
    value,
  })),
];

export default function SearchScreen() {
  const [searchParams, setSearchParams] = React.useState<{
    query: string;
    type: SearchTermType | "ALL";
  }>({
    query: "",
    type: "ALL",
  });

  return (
    <ScrollView style={{ backgroundColor: "#F3F4F5" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingVertical: 25,
          padding: 20,
          gap: 16,
        }}
      >
        <SearchBar
          query={searchParams.query}
          setQuery={(query) => setSearchParams((prev) => ({ ...prev, query }))}
        />
        <SearchTypeSelector
          options={OPTIONS}
          currentType={searchParams.type}
          setType={(tab) =>
            setSearchParams((prev) => ({
              ...prev,
              type: tab as SearchTermType,
            }))
          }
        />
        <SearchResults query={searchParams.query} type={searchParams.type} />
      </View>
    </ScrollView>
  );
}
