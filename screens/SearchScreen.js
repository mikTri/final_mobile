import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Platform, Image, Pressable } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [searchResults, setSearchResults] = useState([]);
  const route = useRoute();
  const { query } = route.params || {};  // Lấy query từ params search
  const navigation = useNavigation();

  useEffect(() => {
    if (query && query.trim() !== "") {  // Kiểm tra query có phải là một từ khóa không
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`https://nhom1-be.onrender.com/api/search?q=${query}`);
          setSearchResults(response.data);  // Lưu kết quả tìm kiếm
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetchSearchResults();
    }
  }, [query]);  // Tìm kiếm khi query thay đổi

  const handleGoBack = () => {
    navigation.goBack();  // Quay lại trang trước đó
    // Nếu cần, bạn có thể gửi thêm thông tin về query cho trang Home khi quay lại
  };
  
  return (
    <View style={styles.container}>
      <Pressable onPress={handleGoBack}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <Text style={styles.textResult} >Kết quả tìm kiếm cho: "{query}"</Text>
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("ProductInfo", {
              id: item.id,
              title: item.title,
              author: item.author,
              rating: item.rating,
              description: item.description,
              language: item.language,
              genres: item.genres,
              pages: item.pages,
              discountPrice: item.discountPrice,
              publisher: item.publisher,
              cover: item.cover, // Truyền chuỗi URL
            })}
          >
            <View style={styles.itemContainer}>
              {/* Hiển thị hình ảnh cuốn sách */}
              <Image
                source={{ uri: item.cover }} // Thay 'coverImage' bằng tên trường tương ứng với URL ảnh trong dữ liệu
                style={styles.thumbnail}
              />
              {/* Hiển thị tên cuốn sách */}
              <Text style={styles.bookTitle}>{item.title}</Text>
            </View>
          </Pressable>

        )
        }
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 10 : 0,
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 20,
  },
  button: {
    flexDirection: "row", // Để tiêu đề và nút back nằm ngang
    alignItems: "center",
    marginBottom: 10,
  },
  textResult: {
    paddingTop: 20,
    fontSize: 18, fontWeight: 'bold', marginBottom: 20
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  itemContainer: {
    flexDirection: "row", // Để tên cuốn sách và hình ảnh hiển thị theo hàng ngang
    alignItems: "center", // Căn giữa các mục
    marginBottom: 20, // Khoảng cách giữa các mục
  },
  thumbnail: {
    width: 50, // Đặt kích thước của hình ảnh thu nhỏ
    height: 75, // Đặt kích thước của hình ảnh thu nhỏ
    marginRight: 10, // Khoảng cách giữa hình ảnh và tên sách
    resizeMode: "cover", // Cắt hình ảnh nếu cần thiết để phù hợp với kích thước
  },
  bookTitle: {
    fontSize: 16, // Kích thước chữ cho tên cuốn sách
    fontWeight: "bold", // Làm đậm tên cuốn sách
    flex: 1, // Để tên sách có thể chiếm hết không gian còn lại
  },
});

export default SearchScreen;
