import { Header } from "@/components/general/Header";
import GainersAndLosers from "@/components/home/GainersAndLosers";
import { TrendingList } from "@/components/home/Trending";
import { useHighlights } from "@/hooks/query";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import { ScrollView, Text } from "tamagui";

const LOTTIE_SIZE = 250;
export default function HomeScreen() {
  const { errorLoadingHighlights } = useHighlights();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F3F4F5" }}>
      <View>
        <Header />
        {errorLoadingHighlights ? (
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F3F4F5",
              gap: 24,
            }}
          >
            <View style={{ height: LOTTIE_SIZE, width: LOTTIE_SIZE }}>
              <LottieView
                style={{ width: LOTTIE_SIZE, height: LOTTIE_SIZE }}
                source={require("../assets/lotties/error.json")}
                autoPlay
                loop
              />
            </View>
            <Text
              fontSize={16}
              maw="80%"
              textAlign="center"
              color="#666666"
              lineHeight={24}
            >
              Something went wrong loading the data. Please try again later.
            </Text>
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              padding: 16,
            }}
          >
            <GainersAndLosers />
            <TrendingList />
            <Text
              marginTop={24}
              marginBottom={16}
              textAlign="center"
              fontWeight={400}
              color="#444"
            >
              Made with ❤️ by Chirag Modh
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
