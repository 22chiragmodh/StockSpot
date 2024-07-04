import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Text } from "react-native-paper";

import { stocks } from "@/data";

import { StockCard } from "@/components/StockCard";
// interface StockData {
//   ticker: string;
//   price: string;
//   change_amount: string;
//   change_percentage: string;
//   volume: string;
// }

// const API_KEY = "5AJ5VF8Q8JZE5NJ5";
// const API_URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`;

export default function HomeScreen() {
  // const [gainers, setGainers] = useState<StockData[]>([]);
  // const [losers, setLosers] = useState<StockData[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(API_URL);
  //       console.log(response);
  //       setGainers(response.data.top_gainers);
  //       setLosers(response.data.top_losers);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const renderItem = ({ item }: { item: StockData }) => (
  //   <View style={styles.item}>
  //     <Text>Ticker: {item.ticker}</Text>
  //     <Text>Price: {item.price}</Text>
  //     <Text>Change Amount: {item.change_amount}</Text>
  //     <Text>Change Percentage: {item.change_percentage}</Text>
  //     <Text>Volume: {item.volume}</Text>
  //   </View>
  // );
  return (
    <View style={{ flex: 1, paddingTop: 30 }}>
      <Text
        variant="titleLarge"
        style={{
          fontWeight: "700",
          marginLeft: 12,
          marginBottom: 5,
        }}
      >
        Top Gainers & Losers
      </Text>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <StockCard
            ticker={item.ticker}
            companyName={item.companyName}
            price={item.price}
            priceChange={item.priceChange}
            priceChangePercentage={item.priceChangePercentage}
            image={item.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginBottom: 10,
    // backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
