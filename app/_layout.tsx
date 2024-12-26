import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="players" options={{ title: "Players" }} />
      <Tabs.Screen name="index" options={{ title: "Games" }} />
    </Tabs>
  );
}
