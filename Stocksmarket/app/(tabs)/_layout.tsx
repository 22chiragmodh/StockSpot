import React, { useEffect, useState } from "react";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { router } from "expo-router";
import HomeScreen from ".";
import LosersScreen from "./two";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Top Gainers",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="angle-double-up" color={color} />
          ),
          header: () => (
            <Pressable
              style={{ width: "100%", paddingHorizontal: 20, paddingTop: 50 }}
              onPress={() => router.push("/search")}
            >
              <TextInput
                placeholder="Search Stocks..."
                disabled
                mode="outlined"
                left={<TextInput.Icon icon={"magnify"} />}
                onPressIn={() => router.push("/search")}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Top Losers",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="angle-double-down" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
