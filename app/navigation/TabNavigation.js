import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExpertScreen from "../screens/ExpertScreen";
import UploadedStocksScreen from "../screens/UploadedStocksScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const TabNavigation = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "tomato",
      activeTintColor: "white",
      inactiveBackgroundColor: "#eee",
      inactiveTintColor: "black",
    }}
  >
    <Tab.Screen
      name="ExpertPost"
      component={ExpertScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="post" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Database"
      component={UploadedStocksScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="database-sync"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigation;
