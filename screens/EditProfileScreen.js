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

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

const EditProfileScreen = () => {
  const { user, editInfo } = useUser(); // Giả sử context cung cấp user và updateUserInfo
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [email] = useState(user.email);
//   const [images, setImages] = useState(null);

  const navigation = useNavigation();

  const isValidPhone = (phone) => {
    const phoneRegex = /^0\d{9}$/; // Bắt đầu bằng 0, tiếp theo là 9 chữ số
    return phoneRegex.test(phone);
  };

  const handleEditInfo = async () => {
    // Kiểm tra các trường có bị bỏ trống không
    if (!name || !phone || !address) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra định dạng số điện thoại
    if (!isValidPhone(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ!");
      return;
    }

    try {
      const updatedInfo = {
        name: name,
        phone: phone,
        address: address.trim(),
        // email không cần cập nhật vì nó không thể thay đổi
      };
      console.log("Updated Info:", updatedInfo);
      // Gọi hàm update thông tin từ context
      await editInfo(updatedInfo);
      Alert.alert("Thành công", "Thông tin tài khoản đã được cập nhật!");
    } catch (error) {
      Alert.alert("Lỗi", "Đã có lỗi xảy ra khi cập nhật thông tin!");
      console.log("Update error: ", error);
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
            backgroundColor: "white", // Nền trắng
            borderRadius: 10, // Bo góc cho View trắng
            padding: 20, // Khoảng cách bên trong
            width: "90%", // Chiếm 90% chiều ngang màn hình
            shadowColor: "#000", // Thêm shadow (tùy chọn)
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
              Chỉnh sửa thông tin
            </Text>
          </View>

          {/* Ava */}
          <View
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
                borderColor: "#D0D0D0", 
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EDEDED", // Nền xám nhạt cho avatar
              }}
            >
              {user.images && user.images.length > 0 ? (
                <Image
                  source={{ uri: user.images[0] }} // URL hình ảnh avatar
                  style={{ width: "100%", height: "100%", borderRadius: 50 }}
                />
              ) : (
                <MaterialIcons name="person" size={50} color="#6633CC" />
              )}
            </View>
          </View>

          {/* Các thông tin */}
          {/* Tên */}
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
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="person"
                size={24}
                color="#6633CC"
              />

              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="Tên người dùng"
              />
            </View>
          </View>

          {/* sdt */}
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
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="phone"
                size={24}
                color="#6633CC"
              />

              <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Dia chi */}
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
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="location-on"
                size={24}
                color="#6633CC"
              />

              <TextInput
                value={address}
                onChangeText={(text) => setAddress(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                //   placeholder="Địa chỉ"
                placeholder={address.trim() !== "" ? address : "Địa chỉ"}
              />
            </View>
          </View>

          {/* email */}
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
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="black"
              />

              <Text
                value={email}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
              >
                {email || "Email"}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 50 }} />

          {/* Save button */}
          <Pressable
            onPress={handleEditInfo}
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

export default EditProfileScreen;

const styles = StyleSheet.create({});
