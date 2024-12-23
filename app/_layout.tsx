import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="players" />
      <Tabs.Screen name="index" />
    </Tabs>
  );
}
