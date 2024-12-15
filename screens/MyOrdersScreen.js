import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import { useUser } from "../context/UserContext";
import axios from "axios";

const MyOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const BASE_URL = `${API_URL}/orders`;
  // const BASE_URL = "https://nhom1-be.onrender.com/api/orders";
  const { userId, isLoading } = useUser();
//   const [expandedOrder, setExpandedOrder] = useState(null);
const [expandedOrders, setExpandedOrders] = useState({});


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const userId = await AsyncStorage.getItem('userid'); // Lấy userid từ AsyncStorage
        if (!userId) {
          setLoading(false);
          return alert(
            "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập."
          );
        }

        const response = await axios.get(`${BASE_URL}/${userId}`);
        const data = response.data;

        if (data.success) {
          setOrders(data.orders);
        } else {
            console.log(data.message || "Không thể tải danh sách đơn hàng.");
        }
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
        // alert("Đã xảy ra lỗi trong khi tải đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

//   const toggleExpanded = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };
const toggleExpanded = (orderId) => {
    setExpandedOrders((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId], // Chỉ thay đổi trạng thái của đơn hàng này
    }));
  };

  //   const renderOrderItem = ({ item }) => (
  //     <TouchableOpacity
  //       style={styles.orderItem}
  //     //   onPress={() => navigation.navigate('OrderDetails', { order: item })}
  //     >
  //       <Image source={{ uri: item.products[0]?.image || 'https://via.placeholder.com/100' }} style={styles.productImage} />
  //       <View style={styles.orderInfo}>
  //         <Text style={styles.orderId}>Mã đơn hàng: {item._id}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   );

  //Ver2
  // const renderOrderItem = ({ item }) => (
  //   <View style={styles.orderItem}>
  //     {/* Trạng thái đơn */}
  //     <Text style={styles.orderStatus}>
  //       Trạng thái: {item.status || "Đang xử lý"}
  //     </Text>

  //     {/* Dòng kẻ xám */}
  //     <View style={styles.separator} />

  //     {/* Hình ảnh và tên sản phẩm đầu tiên */}
  //     <View style={styles.productContainer}>
  //       <Image
  //         source={{
  //           uri: item.products[0]?.image || "https://via.placeholder.com/100",
  //         }}
  //         style={styles.productImage}
  //       />
  //       <View style={styles.productInfo}>
  //         <Text style={styles.productName}>
  //           {item.products[0]?.productTitle || "Sản phẩm không xác định"}
  //         </Text>

  //         {/* Số lượng và tổng tiền */}
  //         <Text style={styles.orderSummary}>
  //           Số lượng: {item.products.length} | Tổng tiền:{" "}
  //           {item.amount.toLocaleString("en-US")}đ
  //         </Text>
  //       </View>
  //     </View>
  //   </View>
  // );

  //Ver3
  const renderOrderItem = ({ item }) => {
    // const expanded = expandedOrder === item._id; // Quản lý trạng thái mở rộng của đơn hàng
    const expanded = expandedOrders[item._id];

    const getTotalQuantity = (products) => {
        return products.reduce((total, product) => total + product.quantity, 0);
      };

    return (
      <View style={styles.orderItem}>
        {/* Trạng thái đơn */}
        <Text style={styles.orderStatus}>
          Trạng thái: {item.status || "Đang xử lý"}
        </Text>

        {/* Dòng kẻ xám */}
        <View style={styles.separator} />

        {/* Hình ảnh sản phẩm bên trái và tên sản phẩm bên phải */}
        <View style={styles.productContainer}>
          <Image
            source={{
              uri: item.products[0]?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRLw7il8Sv0zksKO4e4poebNna1I4n3-SRrw&s",
            }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>
              {item.products[0]?.productTitle || "Sản phẩm không xác định"}
            </Text>
            {/* Số lượng và tổng tiền nằm dưới tên sản phẩm */}
            {/* <Text style={styles.orderSummary}>
              {item.products.length} sản phẩm | Tổng tiền:{" "}
              {item.amount.toLocaleString("vi-VN")}đ
            </Text> */}
                  <Text style={styles.productDetailsText}>
                    Số lượng: {item.products[0].quantity} | Subtotal:{" "}
                    {item.products[0].subTotal.toLocaleString("vi-VN")}đ
                  </Text>
          </View>
        </View>

        {/* Hiển thị các sản phẩm nếu đơn hàng đang được mở rộng */}
        {/* {expanded && item.products.length > 1 && (
          <View style={styles.expandedProducts}>
            {item.products.slice(1).map((product, index) => (
              <View key={index} style={styles.productDetails}>
                <Image
                  source={{
                    uri: product.image || "https://via.placeholder.com/100",
                  }}
                  style={styles.productImageSmall}
                />
                <View style={styles.productInfoSmall}>
                  <Text style={styles.productName}>{product.productTitle}</Text>
                  <Text style={styles.productDetailsText}>
                    Số lượng: {product.quantity} | Subtotal:{" "}
                    {product.subTotal.toLocaleString("vi-VN")}đ
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )} */}
        {expanded && item.products.length > 1 && (
          <ScrollView contentContainerStyle={styles.expandedProducts}>
            {item.products.slice(1).map((product, index) => (
              <View key={index} style={styles.productDetails}>
                <Image
                  source={{
                    uri: product.image || "https://templates.visual-paradigm.com/repository/images/4783989f-5816-4cca-970b-e5223e3d2f19/book-covers-design/illustrated-fantasy-book-cover.png",
                    // uri: "https://via.placeholder.com/100",
                  }}
                  style={styles.productImageSmall}
                />
                <View style={styles.productInfoSmall}>
                  <Text style={styles.productName}>{product.productTitle}</Text>
                  <Text style={styles.productDetailsText}>
                    Số lượng: {product.quantity} | Subtotal:{" "}
                    {product.subTotal.toLocaleString("vi-VN")}đ
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
    

        {/* Tổng số lượng và tổng tiền */}
        {expanded && (
          <View style={styles.totalSummary}>
            <Text style={styles.totalText}>
              {/* Tổng đơn hàng ({item.products.length} sản phẩm): {" "}
              {item.amount.toLocaleString("vi-VN")}đ */}
              Tổng đơn hàng ({getTotalQuantity(item.products)} sản phẩm):{" "}
              {item.amount.toLocaleString("vi-VN")}đ
            </Text>
          </View>
        )}

        {/* Nút xem thêm hoặc thu nhỏ */}
        <TouchableOpacity onPress={() => toggleExpanded(item._id)} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>
            {expanded ? "Thu nhỏ" : "Xem thêm"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#49268a" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Đơn hàng của tôi</Text>
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={renderOrderItem}
        contentContainerStyle={[
          styles.container,
          orders.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Bạn chưa có đơn hàng nào.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default MyOrdersScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 10,
//   },
//   header: {
//     fontSize: 25,
//     fontWeight: "bold",
//     // marginBottom: 20,
//     textAlign: "center",
//     color: "#333",
//   },
//   headerContainer: {
//     paddingTop: 10, // Đảm bảo không bị chồng lên phần dưới
//     paddingBottom: 10,
//     backgroundColor: "#F9F9F9", // Bạn có thể chọn màu nền phù hợp
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd", // Thêm đường viền dưới tiêu đề
//   },
// //   orderItem: {
// //     flexDirection: 'row',
// //     backgroundColor: '#fff',
// //     marginVertical: 5,
// //     borderRadius: 10,
// //     padding: 10,
// //     shadowColor: '#000',
// //     shadowOpacity: 0.1,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowRadius: 5,
// //     elevation: 3,
// //   },
//   productImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   orderInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   orderId: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#49268a',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

// emptyText: {
//     fontSize: 18,
//     textAlign: "center",
//     color: "#888",
//     marginTop: 50,
//   },
//   listContent: {
//     paddingBottom: 10,
//   },
//   orderItem: {
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     padding: 15,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   orderStatus: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 10,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#ddd',
//     marginVertical: 10,
//   },
//   productContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   productImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#444',
//     flex: 1,
//   },
//   orderSummary: {
//     fontSize: 14,
//     fontWeight: '400',
//     color: '#666',
//     marginTop: 10,
//   },
//   productInfo: {
//     flex: 1, // Cho phép phần này chiếm hết không gian còn lại
//   },
// });

const styles = StyleSheet.create({
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
  orderItem: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  productContainer: {
    flexDirection: "row", // Hình ảnh và tên sản phẩm nằm ngang
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
  orderSummary: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
    marginTop: 5,
  },
  expandedProducts: {
    marginTop: 10,
    marginLeft: 70, // Căn chỉnh sản phẩm nhỏ hơn
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImageSmall: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  productInfoSmall: {
    flex: 1,
  },
  productDetailsText: {
    fontSize: 14,
    color: "#666",
  },
  totalSummary: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginLeft: 70,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  toggleButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#49268a",
    borderRadius: 5,
    //   alignSelf: 'flex-start',
    alignSelf: "center",
    alignItems: "center", // Căn giữa theo chiều ngang
    justifyContent: "center",
  },
  toggleButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
        fontSize: 18,
        textAlign: "center",
        color: "#888",
        marginTop: 50,
      },
});

  