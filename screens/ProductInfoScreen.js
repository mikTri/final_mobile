import {
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
    ImageBackground,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";

const ProductInfoScreen = () => {
    const route = useRoute();

    const [addedToCart, setAddedToCart] = useState(false);

    const addItemToCart = (item) => {
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(() => {
            setAddedToCart(false);
        }, 60000);
    };
    
    return (
        <ScrollView style={{ marginTop: 60, flex: 1, backgroundColor: 'white' }}>
            {/* Ảnh bìa */}
            <ImageBackground
                style={styles.coverImage} // Áp dụng style từ StyleSheet
                source={{ uri: route.params.cover }} 
                resizeMode="contain"
            >
            </ImageBackground>

            <View>
                <Text style={{ fontSize: 30, fontWeight: "500", padding: 10, marginTop: 10 }}>
                    {route?.params?.title}
                </Text>
            </View>
            <View style={{ flexDirection: "row", padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: '#4CAF50' }}>
                    {route.params.discountPrice.toLocaleString('en-US')} VNĐ
                </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "right", padding: 10, fontSize: 15 }}>
                <Text style={{}}>Đánh giá: </Text>
                <Text style={{ fontWeight: "bold", color: '#F4A460' }}>
                    {route.params.rating}
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", padding: 10, fontSize: 15 }}>
                <Text>Tác giả: </Text>
                <Text style={{ fontWeight: "bold" }}>
                    {route.params.author}
                </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", padding: 10, fontSize: 15 }}>
                <Text>NXB: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route.params.publisher}
                </Text>
            </View>

            <View style={{ fontSize: 15, flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text>Thể loại: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route.params.genres}
                </Text>
            </View>

            <View style={{ fontSize: 15, flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Text>Ngôn ngữ: </Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {route.params.language}
                </Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "bold", textDecorationLine: 'underline', textAlign: 'justify', padding: 10 }}>
            Mô tả
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "light", textAlign: 'justify', padding: 10 }}>
                {route.params.description}
            </Text>
            <View style={{ paddingBottom: 25 }}>
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
                        <View >
                            <Text>Added to Cart</Text>
                        </View>
                    ) : (
                        <Text>Add to Cart</Text>
                    )}
                </Pressable>
            </View>


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
        width: '100%',
        height: 350,
        resizeMode: "contain", // Kiểu hiển thị ảnh
        marginTop: 10,
    },
});