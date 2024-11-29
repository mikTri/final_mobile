import React, { useState } from "react";
import { Pressable, TextInput, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Hàm xử lý khi người dùng nhập vào ô tìm kiếm
  const handleSearchPress = () => {
    // Điều hướng chỉ khi có từ khóa tìm kiếm
    if (query.trim()) {
      onSearch(query);  // Gửi query tới SearchScreen
    }
  };

  // Hàm xử lý khi người dùng nhấn vào nút xóa
  const handleClear = () => {
    setQuery("");  // Xóa nội dung ô tìm kiếm
    
  };

  return (
    <Pressable style={styles.searchBar} onPress={handleSearchPress}>
      <AntDesign style={styles.icon} name="search1" size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm sách"
        value={query}
        onChangeText={setQuery}
      />
      {query.length > 0 && (
        <Pressable onPress={handleClear}>
          <AntDesign style={styles.clearIcon} name="closecircle" size={20} color="gray" />
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
    marginHorizontal: 7,
    paddingLeft: 10,
  },
  icon: { marginRight: 10 },
  input: { flex: 1 },
  clearIcon: { paddingRight: 10 },
});

export default SearchBar;
