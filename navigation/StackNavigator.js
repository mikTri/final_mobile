import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Foundation from '@expo/vector-icons/Foundation';

import HomeScreen from '../screens/HomeScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          // tabBarLabelStyle: { color: "#49268a" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#49268a" />
            ) : (
              <AntDesign name="home" size={24} color="grey" />
            ),
          tabBarActiveTintColor: "#49268a", // Màu của label khi được chọn
          tabBarInactiveTintColor: "grey", // Màu của label khi không được chọn
        }}
      />

      <Tab.Screen
        name="Category"
        component={HomeScreen}
        options={{
          tabBarLabel: "Danh mục",
          // tabBarLabelStyle: { color: "#49268a" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Foundation name="list-bullet" size={24} color="#49268a" />
            ) : (
              <Foundation name="list-bullet" size={24} color="grey" />
            ),
          tabBarActiveTintColor: "#49268a", // Màu của label khi được chọn
          tabBarInactiveTintColor: "grey",
        }}
      />

      <Tab.Screen
        name="Cart"
        component={HomeScreen}
        options={{
          tabBarLabel: "Giỏ hàng",
          // tabBarLabelStyle: { color: "#49268a" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="cart" size={24} color="#49268a" />
            ) : (
              <Ionicons name="cart-outline" size={24} color="grey" />
            ),
          tabBarActiveTintColor: "#49268a", // Màu của label khi được chọn
          tabBarInactiveTintColor: "grey",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarLabel: "Tài khoản",
          // tabBarLabelStyle: { color: "#49268a" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#49268a" />
            ) : (
              <Ionicons name="person-outline" size={24} color="grey" />
            ),
          tabBarActiveTintColor: "#49268a", // Màu của label khi được chọn
          tabBarInactiveTintColor: "grey",
        }}
      />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreens"
          component={BottomTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;