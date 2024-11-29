import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../context/UserContext"; 

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileScreen = () => {
const { user, logout, fetchUserProfile } = useUser(); // Lấy thông tin user từ context
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 60, resizeMode: "contain" }}
          source={require("../../assets/bookStoreLogo.png")}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="cart" size={24} color="#6633CC" />

          {/* <AntDesign name="search1" size={24} color="black" /> */}
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(false); // Dữ liệu người dùng đã có, chuyển loading thành false
      console.log("Current user: ", user);
    } else {
      setLoading(false); // Nếu không có user, cũng dừng loading để hiển thị nút đăng xuất
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout(); // Gọi logout từ context
      navigation.replace("Signin");
    } catch (error) {
      console.log("Error during logout", error);
    }
  };

  const handletoEditProfile = () => {
    navigation.navigate('EditProfile');  
  };

  const handletoChangePass = () => {
    navigation.navigate('ChangePass');  
  };

  const handletoMyOrders = () => {
    navigation.navigate('MyOrders');  
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }


  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Xin chào {user?.name}, 
      </Text>

      {/* Ava */}
      {/* <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                marginTop: 20,
                width: 100,
                height: 100,
                borderRadius: 50, // Tạo khung tròn
                borderWidth: 2,
                borderColor: "#D0D0D0", // Viền tím
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EDEDED", // Nền xám nhạt cho avatar
              }}
            >
              {user.images && user.images.length > 0 && !imageError ? (
                <Image
                  source={{ uri: user.images[0]}} // URL hình ảnh avatar
                  style={{ width: "100%", height: "100%", borderRadius: 50 }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <MaterialIcons name="person" size={50} color="#6633CC" />
              )}
            </View>
          </View> */}

    {/* Tai khoan */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 20,
        }}
      >

        <Pressable
        onPress={handletoEditProfile}
          style={{
            padding: 10,
            backgroundColor: "#6633CC",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Thông tin tài khoản</Text>
        </Pressable>
      </View>

    {/* Don hang cua toi */}   
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 20,
        }}
      >

        <Pressable
        onPress={handletoMyOrders}
          style={{
            padding: 10,
            backgroundColor: "#6633CC",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold" }}>Đơn hàng của tôi</Text>
        </Pressable>
      </View>

      {/* Doi mat khau */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 20,
        }}
      >

        <Pressable
        onPress={handletoChangePass}
          style={{
            padding: 10,
            backgroundColor: "#6633CC",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold" }}>Đổi mật khẩu</Text>
        </Pressable>
      </View>
    
    {/* Dang xuat */}   
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 20,
        }}
      >
    
        <Pressable
          onPress={handleLogout}
          style={{
            padding: 10,
            backgroundColor: "#6633CC",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 16, fontWeight: "bold"  }}>Đăng xuất</Text>
        </Pressable>
      </View>

      
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
