import { View } from "react-native";

const Chip = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
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
      }}
    >
      {children}
    </View>
  );
};

export default Chip;
