import React, { useState } from "react";
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const fetchSearchResults = async (text) => {
        setQuery(text);
        if (text.trim() === "") {
            onSearch([]); // Trả về mảng rỗng nếu không nhập gì
            return;
        }
        try {
            const response = await fetch(`https://nhom1-be.onrender.com/api/search?q=${text}`);
            const data = await response.json();
            onSearch(data); // Trả về kết quả tìm kiếm
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
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
            <TextInput
                placeholder="Tìm kiếm sách"
                value={query}
                onChangeText={fetchSearchResults}
            />
        </Pressable>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
    },
    icon: { marginRight: 8 },
    input: { flex: 1 },
    resultItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    title: { fontSize: 16, fontWeight: "bold" },
    author: { fontSize: 14, color: "#666" },
    genres: { fontSize: 14, fontStyle: "italic" },
});

export default SearchBar;
