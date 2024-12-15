
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import React, { useEffect }  from 'react';

import StackNavigator from './navigation/StackNavigator';
import { UserContext } from './context/UserContext';  // Import UserContext
import { CartProvider } from './context/CartContext';  // Import CartContext

export default function App() {
  console.disableYellowBox = true;
  useEffect(() => {
    // Tắt cảnh báo về key trong danh sách
    LogBox.ignoreLogs([
      'Each child in a list should have a unique "key" prop', // Chỉ ẩn cảnh báo này
      'Failed to add to cart: undefined',
      'Failed to update cart item: undefined',
      'Possible unhandled promise rejection',
      'Lỗi khi tải đơn hàng: [AxiosError: Request failed with status code 404]'
    ]);
  }, []);
  return (
    <UserContext>
      <CartProvider>
      <StackNavigator/>
      </CartProvider>
    </UserContext>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
