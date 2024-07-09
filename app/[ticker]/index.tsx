import { Fundamentals } from "@/components/stock-details/Fundamentals";
import { StockDetailsTopBar } from "@/components/stock-details/StockDetailsTopBar";
import { StockOverview } from "@/components/stock-details/StockOverview";
import { StockPriceInfo } from "@/components/stock-details/StockPriceInfo";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { ScrollView } from "tamagui";

export default function TickerScreen() {
  const { ticker } = useLocalSearchParams();

  return (
    <ScrollView style={{ backgroundColor: "#F3F4F5" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingVertical: 25,
          padding: 20,
          gap: 24,
        }}
      >
        <StockDetailsTopBar ticker={ticker as string} />
        <StockPriceInfo ticker={ticker as string} />
        <StockOverview ticker={ticker as string} />
        <Fundamentals ticker={ticker as string} />
      </View>
    </ScrollView>
  );
}
