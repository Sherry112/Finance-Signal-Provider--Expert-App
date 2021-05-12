import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./app/navigation/TabNavigation";

export default function App() {
  return (
    <NavigationContainer screenOptions={{ headerShown: false }}>
      <TabNavigation />
    </NavigationContainer>
  );
}
