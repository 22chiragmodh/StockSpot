import {
  Pressable,
  SafeAreaView,
  View,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useContext, useState } from "react";
import { LineChart } from "react-native-gifted-charts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { selectstock, selectstockPrices } from "@/utils/searchStock";
import { formatCurrency } from "@/utils/formatCurrenmcy";
import { useOverview } from "@/helper/useOverview";
export default function TickerScreen() {
  const { ticker } = useLocalSearchParams();
  // const stock = selectstock(ticker as string);
  // const stockPrices = selectstockPrices(ticker as string);
  const { width } = useWindowDimensions();

  const { overview, isLoading, isError } = useOverview(ticker as string);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading data!</Text>;

  // const positiveOverallPriceChange =
  //   stockPrices &&
  //   stockPrices[0].value < stockPrices[stockPrices.length - 1].value;

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 25,
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="chevron-left"
            color={"white"}
            size={40}
          />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons
            name="star-outline"
            color={"white"}
            size={40}
          />
        </Pressable>
      </View>

      {overview ? (
        <FlatList
          data={[1]}
          renderItem={() => (
            <View>
              <View style={{ flexDirection: "row" }}>
                {/* <Image
                  source={stock.image}
                  style={{ height: 50, width: 50 }}
                  contentFit="contain"
                /> */}
                <View style={{ paddingLeft: 20 }}>
                  <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                    {overview.Symbol}
                  </Text>
                  <Text variant="labelMedium">{overview.Name}</Text>
                </View>
              </View>
              {/* <View style={{ paddingTop: 20 }}>
                <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
                  {formatCurrency(stock.price)}
                </Text>
                <Text
                  variant="labelLarge"
                  style={{
                    color:
                      stock.priceChange < 0
                        ? "red"
                        : stock.priceChange > 0
                        ? "lightgreen"
                        : "auto",
                  }}
                >
                  {formatCurrency(stock.priceChange)}{" "}
                  {stock.priceChangePercentage.toFixed(2)}%
                </Text>
              </View> */}
              {/* <View style={{ paddingTop: 20 }}>
                <LineChart
                  areaChart
                  data={stockPrices ?? []}
                  rotateLabel
                  labelsExtraHeight={20}
                  hideDataPoints
                  spacing={width / stockPrices!.length - 2}
                  color={positiveOverallPriceChange ? "green" : "red"}
                  thickness={2}
                  startFillColor={positiveOverallPriceChange ? "green" : "red"}
                  endFillColor={positiveOverallPriceChange ? "green" : "red"}
                  startOpacity={0.9}
                  endOpacity={0.2}
                  initialSpacing={0}
                  hideYAxisText={true}
                  rulesType="solid"
                  rulesColor="black"
                  xAxisColor="lightgray"
                  pointerConfig={{
                    pointerStripHeight: 140,
                    pointerStripColor: "lightgray",
                    pointerStripWidth: 2,
                    pointerColor: "lightgray",
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: (items: any) => {
                      return (
                        <View
                          style={{
                            height: 90,
                            width: 100,
                            justifyContent: "center",
                            marginTop: -30,
                            marginLeft: -40,
                            borderRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              marginBottom: 6,
                              textAlign: "center",
                            }}
                          >
                            {items[0].date}
                          </Text>

                          <View
                            style={{
                              paddingHorizontal: 14,
                              paddingVertical: 6,
                              borderRadius: 16,
                              backgroundColor: "white",
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "black",
                              }}
                            >
                              {"$" + items[0].value.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      );
                    },
                  }}
                />
              </View> */}

              {/* <FlatList
                data={options}
                keyExtractor={(item) => item}
                horizontal
                style={{ marginTop: 80 }}
                renderItem={({ item }) => (
                  
                )}
              /> */}

              <View style={{ marginTop: 20 }}>
                {/* <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                  CEO
                </Text>
                <Text>{stock.ceo}</Text> */}

                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  Exchange
                </Text>
                <Text>{overview.Exchange}</Text>

                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  Sector
                </Text>
                <Text>{overview.Sector}</Text>

                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  Industry
                </Text>
                <Text>{overview.Industry}</Text>

                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  Location
                </Text>
                <Text>{overview.Address}</Text>

                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  Market Cap
                </Text>
                <Text>{overview.MarketCapitalization}</Text>
                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  PE Ratio
                </Text>
                <Text>{overview.PERatio}</Text>
                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  Beta
                </Text>
                <Text>{overview.Beta}</Text>
                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  Dividend Yield
                </Text>
                <Text>{overview.DividendYield}</Text>
                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  Profit Margin
                </Text>
                <Text>{overview.ProfitMargin}</Text>

                <Text
                  variant="titleMedium"
                  style={{ fontWeight: "bold", marginTop: 5 }}
                >
                  Description
                </Text>
                <Text>{overview.Description}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>Stock Not Available</Text>
      )}
    </SafeAreaView>
  );
}
