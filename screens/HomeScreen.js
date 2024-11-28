import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  Platform,
  TextInput,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import ProductItem from '../components/ProductItem';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const images = [
    "https://static.vecteezy.com/system/resources/previews/021/916/224/non_2x/promo-banner-with-stack-of-books-globe-inkwell-quill-plant-lantern-ebook-world-book-day-bookstore-bookshop-library-book-lover-bibliophile-education-for-poster-cover-advertising-vector.jpg",
    "https://assets.penguinrandomhouse.com/wp-content/uploads/2018/03/05105825/1200x628_instagrammable.jpg",
    "https://as2.ftcdn.net/v2/jpg/04/32/32/87/1000_F_432328795_gyl6zdxtuKrwTDLSOgLF2NfnHNLkg1oC.jpg",
  ];
  // const [category, setCategory] = useState("Children");
  // const [items, setItems] = useState([
  //   { label: "Biographies & Memoirs", value: "Biographies & Memoirs" },
  //   { label: "History", value: "History" },
  //   { label: "Children", value: "Children" },
  //   { label: "Romance", value: "Romance" },
  // ]);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]); // state lưu danh sách categories

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

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://nhom1-be.onrender.com/api/categories/all");
        console.log("Categories data:", response.data); // Kiểm tra dữ liệu trả về
        setCategories(response.data); // Giả sử API trả về danh sách categories dưới dạng mảng
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <SearchBar onSearch={setSearchResults} />
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

        <View style={styles.dropdownContainer}>
          <DropDownPicker
            style={styles.dropdown}
            open={open}
            value={categories}
            items={setCategories}
            setOpen={setOpen}
            setValue={categories}
            setItems={setCategories}
            placeholder="choose category"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            zIndex={3000}
            zIndexInverse={1000}
          />


        </View>


        <View style={styles.productList}>
          {products
            ?.filter((item) => item.genres === categories)
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
    paddingTop: Platform.OS === "android" ? 59 : 0,
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    backgroundColor: "#6633CC",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
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
  icon: { paddingLeft: 10 },
  imageSlider: { paddingTop: 10 },
  image: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  dropdownContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 30,
    marginBottom: 15,
    justifyContent: 'center',
  },
  placeholderStyles: {
    color: "#B7B7B7",
    fontSize: 14,
  },
  productList: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    margin: 14,
  },
});

export default HomeScreen;
