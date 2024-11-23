import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert, 
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useUser } from "../context/UserContext"; 


const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const { setUserId } = useUser();
  const { login } = useUser();

  const navigation = useNavigation();

    useEffect(() => {
      const checkSigninStatus = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");

          if (token) {
            navigation.replace("HomeScr");
          }
        } catch (err) {
          console.log("Error checking token: ", err);
        }
      };
      checkSigninStatus();
    }, []);

    const isValidEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return regex.test(email);
    };

    const handleSignin = async  () => {
      if (!isValidEmail(email)) {
        Alert.alert('Lỗi', 'Email không hợp lệ!');
        return;
      }

      try {
        await login(email, password); // Gọi hàm login từ context
        navigation.replace("HomeScr");
      } catch (error) {
        Alert.alert("Lỗi đăng nhập", error.message);
      console.log("Signin error: ", error);
      }
    };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <View>
        <Image
          style={{ width: 300, height: 100 }}
          resizeMode="contain"
          //   source={{
          //     uri: "https://drive.google.com/file/d/15-usau4hOjfntmm9S3a3mkNn_xopxICg/view?usp=drive_link",
          //   }}
          source={require("../../assets/bookStoreLogo.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Đăng nhập
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="black"
            />

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              name="lock1"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!isPasswordVisible}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Mật khẩu"
            />

            <TouchableOpacity
              onPress={() =>
                setIsPasswordVisible(!isPasswordVisible)
              }
              style={{ marginRight: 8 }}
            >
              <FontAwesome5
                name={isPasswordVisible ? "eye-slash" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 50 }} />

        <Pressable
          onPress={handleSignin}
          style={{
            width: 200,
            backgroundColor: "#6633CC",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Text>
        </Pressable>

        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "gray", fontSize: 16 }}>
            Bạn chưa có tài khoản?{" "}
          </Text>

          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "blue", fontSize: 16 }}>Đăng ký ngay</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({});
