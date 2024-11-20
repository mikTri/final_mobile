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
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
const ProductInfoScreen = () => {
    return (
        <ScrollView style={{ marginTop: 65, flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={true}>
            <View style={{
                backgroundColor: "#00CED1",
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
            
        </ScrollView>
    )
}

export default ProductInfoScreen

const styles = StyleSheet.create({})