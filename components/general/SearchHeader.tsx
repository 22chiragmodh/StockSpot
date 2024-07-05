import { IconSearch } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { H2, Image } from "tamagui";
import Constants from "expo-constants";

export const SearchHeader: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 16,
        borderBottomColor: "#E5E5E5",
        marginTop: Constants.statusBarHeight,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        <H2 style={{ marginTop: 6 }} fontSize={24}>
          Stockspot
        </H2>
      </View>

      <Pressable onPress={() => router.push("/search")}>
        <IconSearch size={24} color="black" />
      </Pressable>
    </View>
  );
};
