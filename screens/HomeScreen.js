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
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const images = [
    "https://static.vecteezy.com/system/resources/previews/021/916/224/non_2x/promo-banner-with-stack-of-books-globe-inkwell-quill-plant-lantern-ebook-world-book-day-bookstore-bookshop-library-book-lover-bibliophile-education-for-poster-cover-advertising-vector.jpg",
    "https://assets.penguinrandomhouse.com/wp-content/uploads/2018/03/05105825/1200x628_instagrammable.jpg",
    "https://as2.ftcdn.net/v2/jpg/04/32/32/87/1000_F_432328795_gyl6zdxtuKrwTDLSOgLF2NfnHNLkg1oC.jpg",
  ];
  const [category, setCategory] = useState("Children");
  const [items, setItems] = useState([
    { label: "Biographies & Memoirs", value: "Biographies & Memoirs" },
    { label: "History", value: "History" },
    { label: "Children", value: "Children" },
    { label: "Romance", value: "Romance" },
  ]);
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const BASE_URL = `${API_URL}/books`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get("http://192.168.1.15:8000/api/books/all");
        const response = await axios.get(`${BASE_URL}/all`);
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

  const filteredProducts = products.filter((item) => item.genres === category);
  return (
    //Test
    // <View>
    //   <Text>HomeScreen</Text>
    //   <Pressable
    //       // onPress={() => navigation.navigate("Cart")}
    //       style={{
    //         width: 200,
    //         backgroundColor: "#49268a",
    //         borderRadius: 6,
    //         marginLeft: "auto",
    //         marginRight: "auto",
    //         padding: 15,
    //       }}
    //     >
    //       <Text
    //         style={{
    //           textAlign: "center",
    //           color: "white",
    //           fontSize: 16,
    //           fontWeight: "bold",
    //         }}
    //       >
    //         Go to info
    //       </Text>
    //     </Pressable>
    // </View>

    <SafeAreaView style={{
      paddingTop: Platform.OS === "android" ? 59 : 0,
      flex: 1,
      backgroundColor: "white"
    }} >
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{
          backgroundColor: "#6633CC",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}>
          <Pressable style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}>
            <AntDesign style={{ paddingLeft: 10 }} name="search1" size={24} color="black" />
            <TextInput placeholder="Tim kiem sach" />
          </Pressable>
        </View>

        <FlatList
          style={{ paddingTop: 10 }}
          data={images}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
        />

        <View nestedScrollEnabled={true}
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            marginBottom: open ? 20 : 20,
            justifyContent: 'center',
          }}>
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              height: 30,
              marginBottom: open ? 15 : 15,
              justifyContent: 'center',
            }}
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="choose category"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>

        <View style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          margin: 14,
        }}>
          {products
            ?.filter((item) => item.genres === category)
            // .map((item, index) => (
              .map((item) => (
              // <ProductItem item={item} key={index} />
              <ProductItem key={item.id} item={item} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>

    // <SafeAreaView
    //   style={{
    //     paddingTop: Platform.OS === "android" ? 59 : 0,
    //     flex: 1,
    //     backgroundColor: "white",
    //   }}
    // >
    //   <FlatList
    //     contentContainerStyle={{ flexGrow: 1 }}
    //     data={images} // Data cho ảnh
    //     keyExtractor={(item, index) => index.toString()}
    //     renderItem={({ item }) => (
    //       <Image source={{ uri: item }} style={styles.image} />
    //     )}
    //     ListHeaderComponent={() => (
    //       <View>
    //         {/* Search bar */}
    //         <View
    //           style={{
    //             backgroundColor: "#6633CC",
    //             padding: 10,
    //             flexDirection: "row",
    //             alignItems: "center",
    //           }}
    //         >
    //           <Pressable
    //             style={{
    //               flexDirection: "row",
    //               alignItems: "center",
    //               marginHorizontal: 7,
    //               gap: 10,
    //               backgroundColor: "white",
    //               borderRadius: 3,
    //               height: 38,
    //               flex: 1,
    //             }}
    //           >
    //             <AntDesign
    //               style={{ paddingLeft: 10 }}
    //               name="search1"
    //               size={24}
    //               color="black"
    //             />
    //             <TextInput placeholder="Tìm kiếm sách" />
    //           </Pressable>
    //         </View>

    //         {/* DropDownPicker */}
    //         <View
    //           style={{
    //             marginHorizontal: 10,
    //             marginTop: 20,
    //             marginBottom: open ? 20 : 20,
    //             justifyContent: "center",
    //           }}
    //         >
    //           <DropDownPicker
    //             style={{
    //               borderColor: "#B7B7B7",
    //               height: 30,
    //               marginBottom: open ? 15 : 15,
    //               justifyContent: "center",
    //             }}
    //             open={open}
    //             value={category}
    //             items={items}
    //             setOpen={setOpen}
    //             setValue={setCategory}
    //             setItems={setItems}
    //             placeholder="Choose category"
    //             placeholderStyle={styles.placeholderStyles}
    //             onOpen={onGenderOpen}
    //             zIndex={3000}
    //             zIndexInverse={1000}
    //           />
    //         </View>
    //       </View>
    //     )}
    //     ListFooterComponent={() => (
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           alignItems: "center",
    //           flexWrap: "wrap",
    //           margin: 14,
    //         }}
    //       >
    //         {products
    //           ?.filter((item) => item.genres === category)
    //           .map((item, index) => (
    //             <ProductItem item={item} key={index} />
    //           ))}
    //       </View>
    //     )}
    //   />
    // </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 200,
    resizeMode: "cover",
  },
});
