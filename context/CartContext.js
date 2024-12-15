import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext"; 
import { API_URL } from '@env';

const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const { userId, isLoading  } = useUser();
  const [cart, setCart] = useState([]);
  const BASE_URL = `${API_URL}/cart`;
  // const BASE_URL = "https://nhom1-be.onrender.com/api/cart";
  // Hàm lấy giỏ hàng từ backend khi người dùng login
  const fetchCart = async () => {
    if (!userId) {
      console.warn("User ID is missing");
      return; // Nếu không có userId, không gọi API
    } 
    
    try {
      if (!BASE_URL) {
        console.error("BASE_URL is not defined");
        return;
      }
      const response = await axios.get(`${BASE_URL}/${userId}`);
      console.log("Fetched cart response:", response.data);
      // Nếu giỏ hàng không có sản phẩm (cartItems rỗng hoặc không có), ta vẫn xử lý như bình thường
      if (response.data.success) {
        setCart(response.data.cartItems || []); // Gán giỏ hàng trống nếu không có cartItems
      } else {
        console.error("API response error:", response.data.message);
        setCart([]); // Nếu API trả về lỗi, giỏ hàng sẽ được gán rỗng
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart([]); // Giỏ hàng rỗng trong trường hợp có lỗi xảy ra
    }
  };

  // Hàm cập nhật giỏ hàng lên backend
  const updateCart = async (updatedCart) => {
    try {
      // Không cần thiết phải gửi PUT cho toàn bộ giỏ, chỉ cần cập nhật từng sản phẩm.
      // Tuy nhiên, nếu bạn vẫn muốn gửi cập nhật toàn bộ giỏ hàng, bạn cần phải làm rõ lại route này.
      // await axios.put(`${BASE_URL}`, { userId, cart: updatedCart }); 
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  //Ver2
  // const updateCart = async (updatedCart) => {
  //   try {
  //     // Gửi toàn bộ giỏ hàng lên backend (nếu cần thiết)
  //     const response = await axios.put(`${BASE_URL}/updateCart`, {
  //       userId,
  //       cart: updatedCart,
  //     });
  
  //     if (response.data.success) {
  //       console.log("Cart updated successfully:", response.data);
  //       setCart(response.data.cartItems || []);
  //     } else {
  //       console.error("Failed to update cart:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to update cart:", error.message || error);
  //   }
  // };
  

    // Thêm sản phẩm vào giỏ hàng
    //Ver1
  // const addToCart = async (item) => {
  //   try {
  //     if (!item._id || !item.discountPrice || !userId) {
  //       console.error("Missing required fields: productId, price, or userId");
  //       return;
  //   }
  //   console.log("Adding item to cart:", item);
  //   const existingItem = cart.find((cartItem) => cartItem.productId === item._id);
  //   let updatedCart;
  
  //   if (existingItem) {
  //     updatedCart = cart.map((cartItem) =>
  //       cartItem.productId === item._id
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 ,
  //             subTotal: (cartItem.quantity + 1) * item.discountPrice,
  //           }
  //           : cartItem
  //     );
  //     // Cập nhật số lượng sản phẩm trong giỏ hàng (gửi PUT)
  //     await updateCartItem(existingItem._id, {
  //       quantity: existingItem.quantity + 1,
  //       subTotal: (existingItem.quantity + 1) * item.discountPrice
  //     });
  //   } else {
  //     // updatedCart = [...cart, { ...item, quantity: 1 , subTotal: item.discountPrice,}];
  //     updatedCart = [
  //       ...cart,
  //       {
  //         productId: item._id,
  //         productTitle: item.title,
  //         price: item.discountPrice,
  //         quantity: 1,
  //         subTotal: item.discountPrice,
  //         image: item.cover,
  //         userId: userId,
  //       },
  //     ];
  //     // Thêm sản phẩm mới vào giỏ hàng (gửi POST)
  //     const response = await axios.post(`${BASE_URL}/add`, {
  //       productId: item._id || item.id,
  //       productTitle: item.title,
  //       price: item.discountPrice,
  //       quantity: 1,
  //       subTotal: item.discountPrice,
  //       image: item.cover,
  //       userId: userId, // Assuming `userId` is available
  //     });
  //     if (response.data.success) {
  //       console.log("Added to cart successfully:", response.data);
  //   } else {
  //       console.error("Failed to add to cart:", response.data.message);
  //   }
  //   }
  
  //   setCart(updatedCart);
  //   } catch (error) {
  //       console.error("Error in addToCart:", error.message);
  //       // Thêm thông báo lỗi cho người dùng nếu cần
  //   }
  // };
//Ver2
  const addToCart = async (item) => {
    try {
      if (!item._id || !item.discountPrice || !userId) {
        console.error("Missing required fields: productId, price, or userId");
        return;
      }
  
      console.log("Adding item to cart:", item);
      const existingItem = cart.find((cartItem) => cartItem.productId === item._id);
      
  
      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        const updatedItem = {
          quantity: existingItem.quantity + 1,
          subTotal: (existingItem.quantity + 1) * item.discountPrice,
        };
        await updateCartItem(existingItem._id, updatedItem);
      } else {
        // Nếu là sản phẩm mới, thêm vào giỏ hàng
        const newItem = {
          productId: item._id,
          productTitle: item.title,
          price: item.discountPrice,
          quantity: 1,
          subTotal: item.discountPrice,
          image: item.cover,
          userId,
        };
  
        const response = await axios.post(`${BASE_URL}/add`, newItem);
        
        if (response.data.success) {
          console.log("Added to cart successfully:", response.data);
        } else {
          console.error("Failed to add to cart:", response.data.message);
          // return; // Không cập nhật giỏ hàng nếu thêm thất bại
        }
      }
  
      // Fetch lại giỏ hàng để đảm bảo đồng bộ
      await fetchCart();
    } catch (error) {
      console.error("Error in addToCart:", error.message || error);
    }
  };
  

  
  //Ver3
  // const addToCart = async (item) => {
  //   try {
  //     if (!item._id || !item.discountPrice || !userId) {
  //       console.error("Missing required fields: productId, price, or userId");
  //       return;
  //     }
  
  //     console.log("Adding item to cart:", item);
  
  //     const existingItem = cart.find((cartItem) => cartItem.productId === item._id);
  //     let updatedCart;
  
  //     if (existingItem) {
  //       // Cập nhật số lượng sản phẩm trong giỏ hàng cục bộ
  //       updatedCart = cart.map((cartItem) =>
  //         cartItem.productId === item._id
  //           ? {
  //               ...cartItem,
  //               quantity: cartItem.quantity + 1,
  //               subTotal: (cartItem.quantity + 1) * item.discountPrice,
  //             }
  //           : cartItem
  //       );
  
  //       setCart(updatedCart); // Cập nhật ngay lập tức trong giao diện
  
  //       // Đồng bộ với backend
  //       await updateCartItem(existingItem._id, {
  //         quantity: existingItem.quantity + 1,
  //         subTotal: (existingItem.quantity + 1) * item.discountPrice,
  //       });
  //     } else {
  //       // Thêm sản phẩm mới vào giỏ hàng cục bộ
  //       const newItem = {
  //         productId: item._id,
  //         productTitle: item.title,
  //         price: item.discountPrice,
  //         quantity: 1,
  //         subTotal: item.discountPrice,
  //         image: item.cover,
  //         userId,
  //       };
  
  //       updatedCart = [...cart, newItem];
  //       setCart(updatedCart); // Cập nhật ngay lập tức trong giao diện
  
  //       // Đồng bộ với backend
  //       const response = await axios.post(`${BASE_URL}/add`, newItem);
  //       console.log("Add to Cart response:", response.data);
  //       if (!response.data.success) {
  //         console.error("Failed to add to cart:", response.data.message);
  //         return;
  //       }
  //     }
  
  //     // Fetch lại giỏ hàng từ backend để đảm bảo dữ liệu chính xác
  //     await fetchCart();
  //   } catch (error) {
  //     console.error("Error in addToCart:", error.message || error);
  //   }
  // };
  
  // Xóa sản phẩm khỏi giỏ hàng
  //Ver1
  // const removeFromCart = async (itemId) => {
  //   const updatedCart = cart.filter((cartItem) => cartItem._id !== itemId);
  
  //   try {
  //     // Gửi yêu cầu DELETE để xóa item khỏi giỏ hàng
  //     await axios.delete(`${BASE_URL}/${itemId}`);
  //     setCart(updatedCart);
  //   } catch (error) {
  //     console.error("Failed to remove item from cart:", error);
  //   }
  // };
  
  //Ver2
  // const removeFromCart = async (itemId) => {
  //   try {
  //     console.log("Removing cart item with ID:", itemId);
  //     const response = await axios.delete(`${BASE_URL}/${itemId}`);
  
  //     if (response.data.success) {
  //       console.log("Item removed successfully:", response.data);
  //     } else {
  //       console.error("Failed to remove item:", response.data.message);
  //       return;
  //     }
  
  //     // Fetch lại giỏ hàng để đảm bảo đồng bộ
  //     await fetchCart();
  //   } catch (error) {
  //     console.error("Failed to remove item from cart:", error.message || error);
  //   }
  // };

  //Ver3
  const removeFromCart = async (itemId) => {
    const updatedCart = cart.filter((cartItem) => cartItem._id !== itemId);
  
    try {
      setCart(updatedCart); // Hiển thị ngay lập tức sau khi xóa cục bộ
  
      // Gửi yêu cầu DELETE để xóa item khỏi backend
      await axios.delete(`${BASE_URL}/${itemId}`);
  
      // Fetch lại giỏ hàng từ backend để đảm bảo đồng bộ
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };
    
  //Ver1 update item
  // const updateCartItem = async (itemId, updatedItem) => {
  //   try {
  //     console.log("Updating item:", { itemId, updatedItem });
  //     const response = await axios.put(`${BASE_URL}/${itemId}`, updatedItem);
  //     console.log("Item updated:", response.data);
      
  //     // Cập nhật lại giỏ hàng trong frontend
  //     const updatedCart = cart.map((item) =>
  //       item._id === itemId ? { ...item, ...updatedItem } : item
  //     );
  //     setCart(updatedCart);
  //   } catch (error) {
  //     console.error("Failed to update cart item:", error);
  //   }
  // };
  
  //Ver2
  const updateCartItem = async (itemId, updatedItem) => {
    try {
      console.log("Updating cart item:", { itemId, updatedItem });
      const response = await axios.put(`${BASE_URL}/${itemId}`, updatedItem);
  
      if (response.data.success) {
        console.log("Cart item updated:", response.data);
      } else {
        console.error("Failed to update cart item:", response.data.message);
      }
  
      // Fetch lại giỏ hàng để đảm bảo đồng bộ
      await fetchCart();
    } catch (error) {
      console.error("Failed to update cart item:", error.message || error);
    }
  };

  //Ver3
  // const updateCartItem = async (itemId, updatedItem) => {
  //   try {
  //     console.log("Updating item:", { itemId, updatedItem });
  
  //     // Đồng bộ với backend
  //     const response = await axios.put(`${BASE_URL}/${itemId}`, updatedItem);
  //     console.log("Item updated:", response.data);
  
  //     // Cập nhật giỏ hàng cục bộ
  //     const updatedCart = cart.map((item) =>
  //       item._id === itemId ? { ...item, ...updatedItem } : item
  //     );
  
  //     setCart(updatedCart); // Hiển thị ngay lập tức
  //   } catch (error) {
  //     console.error("Failed to update cart item:", error);
  //   }
  // };
  
  
  // Tăng số lượng sản phẩm
  const incrementQuantity = async (itemId) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem._id === itemId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  
    const updatedItem = updatedCart.find((item) => item._id === itemId);
  
    if (updatedItem) {
      const newSubTotal = updatedItem.quantity * updatedItem.price;
      await updateCartItem(itemId, {
        quantity: updatedItem.quantity,
        subTotal: newSubTotal ,
      });
    }
  
    // setCart(updatedCart);
    const updatedCartWithNewSubTotal = cart.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: updatedItem.quantity, subTotal: newSubTotal }
        : cartItem
    );
    
    setCart(updatedCartWithNewSubTotal);
    await fetchCart();
  
  };

  // Giảm số lượng sản phẩm
  const decrementQuantity = async (itemId) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem._id === itemId && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  
    const updatedItem = updatedCart.find((item) => item._id === itemId);
  
    if (updatedItem) {
      const newSubTotal = updatedItem.quantity * updatedItem.price;
      await updateCartItem(itemId, {
        quantity: updatedItem.quantity,
        subTotal: newSubTotal ,
      });
    }
  
    // setCart(updatedCart);
    const updatedCartWithNewSubTotal = cart.map((cartItem) =>
      cartItem.id === itemId
        ? { ...cartItem, quantity: updatedItem.quantity, subTotal: newSubTotal }
        : cartItem
    );
    
    setCart(updatedCartWithNewSubTotal);
  };

  // Xóa toàn bộ giỏ hàng ver1
  const clearCart = async () => {
    for (let item of cart) {
      await axios.delete(`${BASE_URL}/${item._id}`);
    }
    setCart([]);
  };

  //Ver2
  // const clearCart = async () => {
  //   try {
  //     // Tạo một mảng các promise cho tất cả các yêu cầu xóa
  //     const deletePromises = cart.map(item =>
  //       axios.delete(`${BASE_URL}/${item._id}`) // Xóa sản phẩm theo _id
  //     );
  
  //     // Chờ tất cả các yêu cầu xóa hoàn thành
  //     await Promise.all(deletePromises);
  
  //     // Sau khi xóa thành công, làm sạch giỏ hàng ở client
  //     setCart([]);
  //     console.log("Giỏ hàng đã được xóa.");
  //   } catch (error) {
  //     // Xử lý khi có lỗi xảy ra trong quá trình xóa
  //     console.error("Lỗi khi xóa giỏ hàng:", error);
  //     alert("Đã xảy ra lỗi khi xóa giỏ hàng. Vui lòng thử lại.");
  //   }
  // };
  



  // Tự động lấy giỏ hàng khi người dùng login
  useEffect(() => {
    if (isLoading) {
      console.log("Waiting for UserContext to finish loading...");
      return;
    }
    if (!userId) {
      console.log("UserId is null, skipping fetchCart");
      return;
    }
    fetchCart();
  }, [isLoading, userId]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
