import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
 

const ProductInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  
  // const item = {
  //   _id: route?.params?.id,  // Đảm bảo truyền đúng trường _id
  //   title: route?.params?.title,
  //   author: route?.params?.author,
  //   rating: route?.params?.rating,
  //   description: route?.params?.description,
  //   language: route?.params?.language,
  //   genres: route?.params?.genres,
  //   pages: route?.params?.pages,
  //   discountPrice: route?.params?.discountPrice,
  //   publisher: route?.params?.publisher,
  //   cover: route?.params?.cover,
  // };
      
  // const addItemToCart = (item) => {
  //   setAddedToCart(true);
  //   // dispatch(addToCart(item));
  //   addToCart(item);
  //   setTimeout(() => {
  //     setAddedToCart(false);
  //   }, 60000);
  // };
  const addItemToCart = async () => {
    try {
    const item = {
      _id: route?.params?.id,  // Đảm bảo truyền đúng trường _id
      title: route?.params?.title,
      author: route?.params?.author,
      rating: route?.params?.rating,
      description: route?.params?.description,
      language: route?.params?.language,
      genres: route?.params?.genres,
      pages: route?.params?.pages,
      discountPrice: route?.params?.discountPrice,
      publisher: route?.params?.publisher,
      cover: route?.params?.cover,
    };

    await addToCart(item);  // Truyền item vào hàm addToCart
      setAddedToCart(true);  // Hiển thị trạng thái "đã thêm"
      setTimeout(() => setAddedToCart(false), 2000);  // Reset trạng thái sau 2 giây
    } catch (error) {
      console.error("Có lỗi khi thêm vào giỏ:", error.message);
    }
  }

  return (
    <ScrollView style={{ marginTop: 60, flex: 1, backgroundColor: "white" }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-alt-circle-left" size={26} color="white" />
        </Pressable>

        <Pressable style={styles.searchBar}>
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={24}
            color="black"
          />
          <TextInput placeholder="Tim kiem sach" />
        </Pressable>
      </View>

      {/* Ảnh bìa */}
      <ImageBackground
        style={styles.coverImage} // Áp dụng style từ StyleSheet
        source={{
          uri: route.params.cover || "https://example.com/default-image.jpg",
        }} // Sử dụng ảnh mặc định nếu cover bị thiếu
        resizeMode="contain"
      ></ImageBackground>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {route?.params?.title}
        </Text>

        <View style={{ flexDirection: "row", marginTop: 6 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            $ {route.params.discountPrice}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "right" }}>
            <Text style={{}}> Rating:</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "blue" }}>
              {route.params.rating}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Author: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route.params.author}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Publisher: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route.params.publisher}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Genres: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route.params.genres}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Language: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route.params.language}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "light",
            textAlign: "justify",
            paddingRight: 6,
          }}
        >
          {route.params.description}
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Đã thêm vào giỏ hàng</Text>
          </View>
        ) : (
          <Text>Thêm vào giỏ hàng</Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

// title: item.title,
//                     author: item.author,
//                     rating: item.rating,
//                     description: item.description,
//                     language: item.language,
//                     genres: item.genres,
//                     pages: item.pages,
//                     discountPrice: item.discountPrice,
//                     publisher: item.publisher,
//                     cover: item.cover, // Truyền chuỗi URL

export default ProductInfoScreen;

// Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6633CC",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    alignItems: "center",
    paddingRight: 8, // Thêm khoảng cách trên cho nút back\
    marginBottom: 5,
    paddingLeft: 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  coverImage: {
    width: "100%",
    height: 350,
    resizeMode: "contain", // Kiểu hiển thị ảnh
    marginTop: 10,
  },
});
