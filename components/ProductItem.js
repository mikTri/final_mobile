import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
const ProductItem = ({ item }) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const navigation = useNavigation();
    // console.log(item.cover); // Kiểm tra xem cover là gì
    return (
        <View style={{ paddingLeft: 4, margin: 16 }} >
            <Pressable
                onPress={() => navigation.navigate("Info", {
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
                
                <Image
                    style={{ width: 150, height: 150, resizeMode: 'contain' }}
                    source={{ uri: item?.cover || 'https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg' }} // Fallback image if item?.cover is undefined
                />
                <Text numberOfLines={1} style={{ width: 150, marginTop: 5 }}>
                    {item?.title}
                </Text>
                <View
                    style={{
                        marginTop: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                    <Text style={{ fontSize: 13, fontWeight: "bold", color: '#4CAF50' }}>{item?.discountPrice.toLocaleString('en-US')} VNĐ</Text>
                    <Text style={{ color: "#F4A460", fontWeight: "bold", fontSize: 13 }}>{item?.rating}
                    </Text>
                </View>
                <Pressable
                    onPress={() => addItemToCart(item)}
                    style={{
                        backgroundColor: "#FFC72C",
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}
                >
                    {addedToCart ? (
                        <View>
                            <Text>Bo vao gio hang</Text>
                        </View>
                    ) : (
                        <Text>Bo vao gio hang</Text>
                    )}
                </Pressable>
            </Pressable>

        </View>

    )
}

export default ProductItem

const styles = StyleSheet.create({})