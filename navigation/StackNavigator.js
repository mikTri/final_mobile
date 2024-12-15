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

import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from '../screens/HomeScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePwScreen from '../screens/ChangePwScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';

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
        name="Cart"
        component={CartScreen}
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
        component={ProfileScreen}
        options={{
          tabBarLabel: "Tài khoản",
          // tabBarLabelStyle: { color: "#49268a" },
          // headerShown: false,
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
          name="Signin"
          component={SigninScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScr"
          component={BottomTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductInfo"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePass"
          component={ChangePwScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrdersScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;