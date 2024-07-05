import { Pressable, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { router } from "expo-router";

interface NavbarProps {
  title: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,

        alignItems: "flex-end",
        marginTop: 25,
      }}
    >
      <View>
        <Text
          variant="titleLarge"
          style={{
            fontWeight: "700",
            marginLeft: 12,
            marginBottom: 5,
            fontFamily: "Axiforma",
          }}
        >
          {title}
        </Text>
      </View>

      <View>
        <Pressable
          style={{
            width: "100%",
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
          onPress={() => router.push("/search")}
        >
          {/* <TextInput
                placeholder="Search Stocks..."
                disabled
                mode="outlined"
                left={<TextInput.Icon icon={"magnify"} />}
                onPressIn={() => router.push("/search")}
              /> */}
          <Icon source="magnify" size={30} />
        </Pressable>
      </View>
    </View>
  );
};
