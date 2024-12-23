import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerRight: () => <Text>Right</Text> }}>
      <Tabs.Screen name="players" options={{ title: "Players" }} />
      <Tabs.Screen name="index" options={{ title: "Games" }} />
    </Tabs>
  );
}
