import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

const ChangePwScreen = () => {
  const { user, changePassword } = useUser(); // Context có chức năng đổi mật khẩu
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCurrentPwVisible, setIsCurrentPwVisible] = useState(false);
  const [isNewPwVisible, setIsNewPwVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
    // const [email] = useState(user.email);


  const navigation = useNavigation();

  const handleChangePw = async () => {
    // Kiểm tra trường trống
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const updatedInfo = {
        email: user.email, // email người dùng
        password: currentPassword, // mật khẩu cũ
        newPass: newPassword, // mật khẩu mới
      };
      // Gọi hàm đổi mật khẩu từ context
      await changePassword(updatedInfo, user._id);
      Alert.alert("Thành công", "Mật khẩu của bạn đã được thay đổi!");
    } catch (error) {
      Alert.alert("Lỗi", error.message);
      console.log("Change password error:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#6633CC", // Màu tím nhạt làm nền
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20,
            width: "90%",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          {/* Tiêu đề */}
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginTop: 25,
                color: "#041E42",
                // color: "white"
              }}
            >
              Đổi mật khẩu
            </Text>
          </View>

          {/* Mật khẩu cũ */}
          <View style={{ marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                //   backgroundColor: "#D0D0D0",
                borderWidth: 1,
                borderColor: "#6633CC",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <TextInput
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
                secureTextEntry={!isCurrentPwVisible}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                  marginLeft:8,
                  flex: 1
                }}
                placeholder="Nhập mật khẩu hiện tại"
              />
              <TouchableOpacity
                onPress={() => setIsCurrentPwVisible(!isCurrentPwVisible)}
                style={{ marginRight: 8 , justifyContent: 'center', alignItems: 'center'}}
                >
                <FontAwesome5
                  name={isCurrentPwVisible ? "eye-slash" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Mat khau moi */}
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                //   backgroundColor: "#D0D0D0",
                borderWidth: 1,
                borderColor: "#6633CC",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <TextInput
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry={!isNewPwVisible}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                  flex: 1,
                  marginLeft: 8
                }}
                placeholder="Nhập mật khẩu mới"
              />

              <TouchableOpacity
                onPress={() => setIsNewPwVisible(!isNewPwVisible)}
                style={{ marginRight: 8 , justifyContent: 'center', alignItems: 'center'}}
              >
                <FontAwesome5
                  name={isNewPwVisible ? "eye-slash" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Xac nhan mat khau moi */}
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                //   backgroundColor: "#D0D0D0",
                borderWidth: 1,
                borderColor: "#6633CC",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <TextInput
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={!isConfirmPasswordVisible}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                  marginLeft:8,
                  flex:1
                }}
                //   placeholder="Địa chỉ"
                placeholder="Xác nhận mật khẩu mới"
              />

              <TouchableOpacity
                onPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                style={{ marginRight: 8 , justifyContent: 'center', alignItems: 'center'}}
              >
                <FontAwesome5
                  name={isConfirmPasswordVisible ? "eye-slash" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 50 }} />

          {/* Save button */}
          <Pressable
            onPress={handleChangePw}
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
              Lưu thay đổi
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePwScreen;

const styles = StyleSheet.create({});
