import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, FlatList } from "react-native";
import { useContext } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Storecontext } from "./_layout";
import { Text } from "react-native-paper";
import { StockCard } from "@/components/StockCard";
export default function SearchScreen() {
  const { searchQuery, searchdStocks } = useContext(Storecontext);

  if (!searchQuery && searchdStocks.length == 0)
    return (
      <View style={styles.container}>
        <Text>Search Stocks</Text>
      </View>
    );

  if (searchQuery && searchdStocks.length == 0) return;
  <View style={styles.container}>
    <Text>No Stocks Found :(</Text>
  </View>;

  return (
    <FlatList
      data={searchdStocks}
      keyExtractor={(item) => item.ticker}
      renderItem={({ item }) => <StockCard {...item} />}
    />
  );
}

const styles = StyleSheet.create({
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
