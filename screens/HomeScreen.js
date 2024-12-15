import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select";

import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const images = [
    "https://static.vecteezy.com/system/resources/previews/021/916/224/non_2x/promo-banner-with-stack-of-books-globe-inkwell-quill-plant-lantern-ebook-world-book-day-bookstore-bookshop-library-book-lover-bibliophile-education-for-poster-cover-advertising-vector.jpg",
    "https://assets.penguinrandomhouse.com/wp-content/uploads/2018/03/05105825/1200x628_instagrammable.jpg",
    "https://as2.ftcdn.net/v2/jpg/04/32/32/87/1000_F_432328795_gyl6zdxtuKrwTDLSOgLF2NfnHNLkg1oC.jpg",
  ];
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const navigation = useNavigation();

  // Fetch books
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://nhom1-be.onrender.com/api/books/all");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };
    fetchData();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://nhom1-be.onrender.com/api/categories/all");
        setItems(response.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  

  const handleSearchPress = (query) => {
    navigation.navigate("Search", { query });  // Pass query to SearchScreen
  };
  
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
      <SearchBar onSearch={handleSearchPress} />
      </View>

      <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}>
        <FlatList
          style={styles.imageSlider}
          data={images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
        />

        <View style={styles.Category}>
          <RNPickerSelect
            style={{
              inputIOS: styles.inputIOS,
              inputAndroid: styles.inputAndroid,
              placeholder: styles.placeholderStyles,
            }}
            onValueChange={(value) => setCategory(value)}
            items={items.map((cat) => ({ label: cat.name, value: cat.name }))}
            placeholder={{
              label: "ALL",
              value: null,
              color: "#6633CC",
            }}
          />


        </View>
        <View style={styles.productList}>
          {products
            ?.filter((item) => {
              if (!category) {
                return true;
              }
              return item.genres?.includes(category);
            })
            .map((item, index) => (
              <ProductItem item={item} key={index} />
            ))}
        </View>



      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 0 : 50,
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    backgroundColor: "#6633CC", // Màu tím cho thanh tìm kiếm
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Cân bằng các thành phần
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
    elevation: 2, // Tạo bóng cho thanh tìm kiếm
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  icon: { paddingLeft: 10 },
  imageSlider: { paddingTop: 10 },
  image: {
    width: width - 20, // Thêm lề hai bên
    height: 200,
    resizeMode: "cover",
    marginHorizontal: 10,
  },
  Category: {
    marginHorizontal: 10, // Giảm khoảng cách ngang
    marginTop: 10, // Giảm khoảng cách trên
    marginBottom: 10,
    justifyContent: "center",
    backgroundColor: "black",

  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  placeholderStyles: {
    color: "#B7B7B7",
    fontSize: 10,
  },
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    backgroundColor: "#DDDDDD",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "black",
    color: "#6633CC",
    backgroundColor: "#DDDDDD",
  },
  productList: {
    flexDirection: "row",
    justifyContent: "space-between", // Khoảng cách đồng đều giữa các item
    flexWrap: "wrap",
    marginHorizontal: 10,
  },
  productItem: {
    width: (width - 40) / 2, // Chia đều không gian cho mỗi sản phẩm
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2, // Tạo hiệu ứng nổi
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  }
});

export default HomeScreen;
