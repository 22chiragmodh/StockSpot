import { StyleProp, View, ViewStyle } from "react-native";

const Chip = ({
  children,
  color,
  style,
}: {
  children: React.ReactNode;
  color: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        backgroundColor: color,
        padding: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        ...((style || {}) as object),
      }}
    >
      {children}
    </View>
  );
};

export default Chip;
