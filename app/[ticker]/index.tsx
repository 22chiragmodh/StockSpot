import { Fundamentals } from "@/components/stock-details/Fundamentals";
import { StockDetailsTopBar } from "@/components/stock-details/StockDetailsTopBar";
import { StockOverview } from "@/components/stock-details/StockOverview";
import { StockPriceInfo } from "@/components/stock-details/StockPriceInfo";
import { useOverview } from "@/hooks/query";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView, Text } from "tamagui";
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from "react-native-chart-kit";
export default function TickerScreen() {
  const { ticker } = useLocalSearchParams();
  // const stock = selectstock(ticker as string);
  // const stockPrices = selectstockPrices(ticker as string);
  const { width } = useWindowDimensions();

  const { overview, isLoading, isError } = useOverview(ticker as string);

  // if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading data Hehe!</Text>;

  // const positiveOverallPriceChange =
  //   stockPrices &&
  //   stockPrices[0].value < stockPrices[stockPrices.length - 1].value;

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
        {/* <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          style={{
            padding: 0,
            margin: 0,
            position: "relative",
          }}
          height={300}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withDots={false}
          withHorizontalLines={false}
          withVerticalLines={false}
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "rgba(255, 255, 255, 0)",
            backgroundGradientTo: "rgba(255, 255, 255, 0)",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(13, 98, 235, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(13, 98, 235, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
        /> */}
        <StockDetailsTopBar ticker={ticker as string} />
        <StockPriceInfo ticker={ticker as string} />
        <StockOverview ticker={ticker as string} />
        <Fundamentals ticker={ticker as string} />
      </View>
    </ScrollView>
  );
  // return (
  //   <SafeAreaView style={{ flex: 1, marginHorizontal: 20, marginBottom: 10 }}>
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         paddingVertical: 25,
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       <Pressable onPress={() => router.back()}>
  //         <MaterialCommunityIcons
  //           name="chevron-left"
  //           color={"white"}
  //           size={40}
  //         />
  //       </Pressable>
  //       <Pressable>
  //         <MaterialCommunityIcons
  //           name="star-outline"
  //           color={"white"}
  //           size={40}
  //         />
  //       </Pressable>
  //     </View>

  //     {overview ? (
  //       <FlatList
  //         data={[1]}
  //         renderItem={() => (
  //           <View>
  //             <View style={{ flexDirection: "row" }}>
  //               {/* <Image
  //                 source={stock.image}
  //                 style={{ height: 50, width: 50 }}
  //                 contentFit="contain"
  //               /> */}
  //               <View style={{ paddingLeft: 20 }}>
  //                 <Text fontSize={18} style={{ fontWeight: "bold" }}>
  //                   {overview.Symbol}
  //                 </Text>
  //                 <Text fontSize={16}>{overview.Name}</Text>
  //               </View>
  //             </View>

  //             <View style={{ marginTop: 20 }}>
  //               {/* <Text fontSize={18} style={{ fontWeight: "bold" }}>
  //                 CEO
  //               </Text>
  //               <Text>{stock.ceo}</Text> */}

  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 Exchange
  //               </Text>
  //               <Text>{overview.Exchange}</Text>

  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 Sector
  //               </Text>
  //               <Text>{overview.Sector}</Text>

  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 Industry
  //               </Text>
  //               <Text>{overview.Industry}</Text>

  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 Location
  //               </Text>
  //               <Text>{overview.Address}</Text>

  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 Market Cap
  //               </Text>
  //               <Text>{overview.MarketCapitalization}</Text>
  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 PE Ratio
  //               </Text>
  //               <Text>{overview.PERatio}</Text>
  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 Beta
  //               </Text>
  //               <Text>{overview.Beta}</Text>
  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 Dividend Yield
  //               </Text>
  //               <Text>{overview.DividendYield}</Text>
  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 Profit Margin
  //               </Text>
  //               <Text>{overview.ProfitMargin}</Text>

  //               <Text
  //                 fontSize={18}
  //                 style={{ fontWeight: "bold", marginTop: 5 }}
  //               >
  //                 Description
  //               </Text>
  //               <Text>{overview.Description}</Text>
  //             </View>
  //           </View>
  //         )}
  //       />
  //     ) : (
  //       <Text>Stock Not Available</Text>
  //     )}
  //   </SafeAreaView>
  // );
}
