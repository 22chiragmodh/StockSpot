import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  ThemeProvider,
  DefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, createContext, useState } from "react";
import { PaperProvider, TextInput } from "react-native-paper";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { theme } from "@/theme";
import { SearchableStock } from "@/data";
import { searchStocks } from "@/utils/searchStock";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Axiforma: require("../assets/fonts/Axiforma-Medium.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export const Storecontext = createContext<{
  searchQuery: string;
  setSearchQuery: (str: string) => void;
  searchdStocks: SearchableStock[];
  setSearchedStocks: (stocks: SearchableStock[]) => void;
}>({
  searchQuery: "",
  setSearchQuery: () => {},
  searchdStocks: [],
  setSearchedStocks: () => {},
});

function RootLayoutNav() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchdStocks, setSearchedStocks] = useState<SearchableStock[]>([]);
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={DarkTheme}>
        <Storecontext.Provider
          value={{
            searchQuery,
            setSearchQuery,
            searchdStocks,
            setSearchedStocks,
          }}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="search"
              options={{
                headerTitle: () => (
                  <TextInput
                    mode="outlined"
                    placeholder="Search Stock...."
                    activeOutlineColor="grey"
                    autoFocus
                    dense
                    style={{ width: "90%" }}
                    onChangeText={(text: string) => {
                      setSearchQuery(text);
                      const stocks = searchStocks(text);
                      setSearchedStocks(stocks);
                    }}
                  />
                ),
              }}
            />
            <Stack.Screen name="Product" options={{ headerShown: false }} />
          </Stack>
        </Storecontext.Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
