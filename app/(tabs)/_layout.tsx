import React, { useEffect, useState } from "react";
import axios from "axios";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import { useColorScheme } from "@/components/useColorScheme";

import { Navbar } from "@/components/navbar";
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
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          height: 50,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: "black",
          paddingHorizontal: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          fontFamily: "Axiforma",
          marginBottom: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Top Gainers",
          tabBarIcon: () => null,

          header: () => <Navbar title="Top Gainers" />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Top Losers",
          tabBarIcon: () => null,
          header: () => <Navbar title="Top Losers" />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Actively Traded",
          tabBarIcon: () => null,
          header: () => <Navbar title="Actively Traded" />,
        }}
      />
    </Tabs>
  );
}
