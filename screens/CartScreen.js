import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity,
  Image
 } from "react-native";
import React from "react";
import { useCart } from "../context/CartContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import { API_URL } from '@env';
import axios from "axios";

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.subTotal, 0);
  const { user } = useUser();
  // const BASE_URL = `${API_URL}/orders`;
  const BASE_URL = `https://nhom1-be.onrender.com/user`;


  //Xử lý check out
  const handleCheckout = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để tiếp tục mua hàng.");
      return;
    }

    // if (cart.length === 0) {
    //   alert("Giỏ hàng trống, không thể mua hàng.");
    //   return;
    // }

    try {
      const orderDetails = {
        name: user.name,  // Lấy tên người dùng từ context
        phoneNumber: user.phone,  // Lấy số điện thoại từ context
        address: user.address,  // Lấy địa chỉ từ context
        amount: totalPrice,
        paymentId: "PAY123456",  // Bạn có thể thay thế theo yêu cầu thanh toán thực tế
        email: user.email,  // Lấy email từ context
        userid: user._id,  // Lấy userId từ context
        products: cart.map(item => ({
          productId: item._id,
          productTitle: item.productTitle,
          quantity: item.quantity,
          price: item.price,
          subTotal: item.subTotal,
        })),
        status: "Đang xử lý",
      };

      // Gửi yêu cầu tạo đơn hàng
      const response = await axios.post(`${BASE_URL}/create`, orderDetails);

      if (response.status === 201) {
        alert("Mua hàng thành công!");

        // Xóa giỏ hàng sau khi mua thành công
        clearCart();  // Giả sử clearCart là hàm để xóa giỏ hàng trong context
        // navigation.navigate('OrderDetails', { orderId: response.data._id }); // Chuyển hướng tới trang chi tiết đơn hàng
      } else {
        alert("Đã xảy ra lỗi khi tạo đơn hàng.");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi mua hàng.");
    }
  };

  return (
  <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Giỏ hàng</Text>
    </View>
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]}>

      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Bạn chưa có sản phẩm nào trong giỏ hàng.</Text>
      ) : (
        cart.map((item) => (            
          <View key={item._id} style={styles.cartItem}> 
            {/* Hình ảnh sản phẩm, nằm bên trái */}
            <Image source={{ uri: item.image }} style={styles.productImage} />

            {/* Thông tin sản phẩm */}
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.productTitle}</Text>
              <Text style={styles.itemPrice}>
          {item.subTotal ? item.subTotal.toLocaleString('en-US') : 'Đang cập nhật...'}đ
        </Text>

              {/* Phần số lượng và nút xóa nằm cùng hàng */}
              <View style={styles.quantityAndRemove}>

                {/* Nút giảm số lượng */}
                <TouchableOpacity 
                  onPress={() => decrementQuantity(item._id)} 
                  style={[styles.quantityButton, item.quantity === 1 && styles.disabledButton]} 
                  disabled={item.quantity === 1}  // Vô hiệu hóa nút khi số lượng = 1
                >
                  <Text style={[styles.quantityText, item.quantity === 1 && styles.disabledText]}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantity}>{item.quantity}</Text>

                {/* Nút tăng số lượng */}
                <TouchableOpacity onPress={() => incrementQuantity(item._id)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>

                {/* Nút xóa nằm bên phải */}
                <TouchableOpacity onPress={() => removeFromCart(item._id)} style={styles.removeButton}>
                  <MaterialIcons name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}

      {cart.length > 0 && (
        <View style={styles.clearCartButtonContainer}>
          <TouchableOpacity onPress={clearCart} style={styles.clearCartButton}>
            <Text style={styles.clearCartText}>Xóa tất cả</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>

    {cart.length > 0 && (
        // Footer với tổng tiền và nút mua hàng
        <View style={styles.footer}>
          {/* Hiển thị tổng tiền giỏ hàng */}
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Tổng tiền: </Text>
            <Text style={styles.totalPriceAmount}>{totalPrice.toLocaleString('en-US')}đ</Text>
          </View>

          {/* Nút mua hàng */}
          {/* <TouchableOpacity onPress={() => alert("Mua hàng thành công!")} style={styles.checkoutButton}> */}
          <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Mua hàng</Text>
          </TouchableOpacity>
        </View>
      )}
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
  padding: 16,
  backgroundColor: "#F9F9F9",

},
header: {
  fontSize: 25,
  fontWeight: "bold",
  // marginBottom: 20,
  textAlign: "center",
  color: "#333",
},
headerContainer: {
  paddingTop: 10, // Đảm bảo không bị chồng lên phần dưới
  paddingBottom: 10,
  backgroundColor: "#F9F9F9", // Bạn có thể chọn màu nền phù hợp
  alignItems: "center",
  borderBottomWidth: 1,
  borderBottomColor: "#ddd", // Thêm đường viền dưới tiêu đề
},

emptyCart: {
  fontSize: 18,
  textAlign: "center",
  color: "#888",
  marginTop: 50,
},
cartItem: {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start", // Hình ảnh nằm trên cùng bên trái
  backgroundColor: "#FFF",
  padding: 16,
  borderRadius: 8,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  marginBottom: 12,
},
productImage: {
  width: 80,
  height: 80,
  borderRadius: 10,
  marginRight: 15,
  alignSelf: 'flex-start', // Đảm bảo hình ảnh nằm bên trái trên cùng
},
itemDetails: {
  flex: 1,
  justifyContent: "flex-start",
},
itemName: {
  fontSize: 18,
  fontWeight: "600",
  marginBottom: 4,
},
itemPrice: {
  fontSize: 16,
  color: "#555",
  marginBottom: 8,
},
quantityAndRemove: {
  flexDirection: "row",
  alignItems: "center", // Nút số lượng và nút xóa cùng hàng
  justifyContent: "space-between", // Giữa số lượng và nút xóa
  marginTop: 8,
},
quantityButton: {
  width: 30,
  height: 30,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 15,
  backgroundColor: "#f1f1f1",
  marginHorizontal: 10,
},
disabledButton: {
  backgroundColor: "#f0f0f0", // Màu nền khi vô hiệu hóa
  borderColor: "#ccc", // Viền xám khi vô hiệu hóa
},
disabledText: {
  color: "#ccc", // Màu chữ xám mờ khi vô hiệu hóa
},
quantityText: {
  fontSize: 18,
  fontWeight: "bold",
},
quantity: {
  fontSize: 16,
  fontWeight: "bold",
},
removeButton: {
  marginLeft: 10,
  padding: 5,
},
footer: {
  marginTop: 20,
  alignItems: "center",
},
clearCartButton: {
  backgroundColor: "#6633CC",
  padding: 10,
  borderRadius: 5,
},
clearCartText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "bold",
},
footer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
  borderTopWidth: 1,
  borderTopColor: '#ddd',
},
totalPriceContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
totalPriceText: {
  fontSize: 16,
  fontWeight: 'bold',
},
totalPriceAmount: {
  fontSize: 18,
  color: 'red',
  fontWeight: "bold",
  marginLeft: 5,
},
checkoutButton: {
  backgroundColor: '#6633CC', // Màu nút mua hàng
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
},
checkoutText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
// clearCartButton: {
//   paddingVertical: 10,
//   paddingHorizontal: 20,
//   borderRadius: 5,
//   backgroundColor: '#f0f0f0',
// },
// clearCartText: {
//   color: '#FF6347',
//   fontSize: 16,
//   fontWeight: 'bold',
// },
clearCartButtonContainer: {
  alignItems: 'center',
  marginTop: 20, // Thêm khoảng cách giữa nút "Xóa tất cả" và các sản phẩm
},

});
export default CartScreen;