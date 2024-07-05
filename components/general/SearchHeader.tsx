import { IconSearch } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { H2, H4, Text } from "tamagui";

interface NavbarProps {
  title: string;
}

export const SearchHeader: React.FC<NavbarProps> = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 16,
        paddingVertical: 20,
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          gap: 0,
        }}
      >
        <H2>Stockspot</H2>
      </View>

      <Pressable onPress={() => router.push("/search")}>
        <IconSearch size={24} />
      </Pressable>
    </View>
  );
};
