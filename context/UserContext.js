import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDataFromStorage = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedAuthToken = await AsyncStorage.getItem("authToken");
        console.log("Stored UserId:", storedUserId);
    console.log("Stored AuthToken:", storedAuthToken);
        if (storedUserId && storedAuthToken) {
          setUserId(storedUserId);
          setAuthToken(storedAuthToken);
        //   fetchUserProfile(storedUserId);
        }else {
            console.log("UserId or AuthToken is not available.");
          }
      } catch (error) {
        console.log("Error fetching user data from AsyncStorage", error);
      }
    };
    getUserDataFromStorage();
  }, []);

  //Log in
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://192.168.1.99:8000/api/user/signin",
        // "https://nhom1-be.onrender.com/api/users/signin",
        { email, password }
      );
      const token = response.data.token;
      const userId = response.data.userId;
    
      // Lưu thông tin user vào AsyncStorage
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userId", userId);

      setAuthToken(token);
      setUserId(userId);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Trả về thông báo lỗi chi tiết từ server (nếu có)
        throw new Error(
          error.response.data?.msg ||
            "Đã có lỗi xảy ra trong quá trình đăng nhập."
        );
      } else {
        // Trường hợp không có phản hồi từ server (lỗi mạng, v.v.)
        throw new Error(
          "Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng."
        );
      }
    }
  };

  //log out
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userId");
      setAuthToken(null);
      setUserId(null);
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

//   fetch user profile
    const fetchUserProfile = async () => {
        if (!userId) {
        console.log("UserId is not available.");
        return;
        }

        try {
        const response = await axios.get(
            `http://192.168.1.99:8000/api/user/${userId}`
            // `https://nhom1-be.onrender.com/api/user/${userId}`

        );
        console.log("API response:", response.data);
        if (response.data && response.data._id){
            setUser(response.data);
            console.log("Fetched user:", response.data);
        } else {
            // Nếu dữ liệu không hợp lệ, thông báo lỗi
            console.log("Invalid user data received:", response.data);
        }
        } catch (error) {
        console.log("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [userId]);


  //sign up
  const signup = async (name, email, password, phone) => {
    const user = { name, email, password, phone };

    try {
      const response = await axios.post(
        "http://192.168.1.99:8000/api/user/signup",
        // "https://nhom1-be.onrender.com/api/user/signup",
        user
      );
      console.log("Đăng ký thành công: ", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Lỗi từ server (400, 500)
        throw new Error(error.response.data.msg || "Đã có lỗi xảy ra!");
      } else if (error.request) {
        // Lỗi không nhận được phản hồi từ server
        throw new Error("Không thể kết nối đến server");
      } else {
        throw new Error("Đã có lỗi xảy ra!");
      }
    }
  };

  //edit info
  const editInfo = async (updatedInfo) => {
    console.log("Updated Info Sent to Server:", updatedInfo);
    try {
      // Gửi yêu cầu PUT tới server để cập nhật thông tin người dùng
      const response = await axios.put(
        `http://192.168.1.99:8000/api/user/${userId}`,
        updatedInfo
        // `https://nhom1-be.onrender.com/api/user/${userId}`
      );

    //   setUser(response.data);
    console.log("EditInfo API response: ", response.data);
    setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("Cập nhật thông tin người dùng thất bại: ", error);
      throw new Error("Cập nhật thông tin không thành công");
    }
  };

  const changePassword = async (updatedInfo, userId) => {
    console.log("Updated Info Sent to Server:", updatedInfo);
    try {
      // Gửi yêu cầu PUT tới server để cập nhật thông tin người dùng
      const response = await axios.put(
        `http://192.168.1.99:8000/api/user/changePassword/${userId}`,
        updatedInfo
        // `https://nhom1-be.onrender.com/api/user/${userId}`
      );

    //   setUser(response.data);
    if (response.data.success) {
    console.log("Password updated successfully, API response: ", response.data);
    setUser(response.data.user);
      return response.data;
    } else {
        throw new Error(response.data.msg || "Cập nhật mật khẩu không thành công.");
    }
    } catch (error) {
        if (error.response) {
            // Trả về thông báo lỗi chi tiết từ server (nếu có)
            throw new Error(
              error.response.data?.msg ||
                "Đã có lỗi xảy ra trong quá trình đăng nhập."
            );
          } else {
            // Trường hợp không có phản hồi từ server (lỗi mạng, v.v.)
            throw new Error(
              "Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng."
            );
          }
    }
  };

  return (
    <UserType.Provider
      value={{ user, userId, authToken, login, logout, signup, editInfo, fetchUserProfile, changePassword }}
    >
      {children}
    </UserType.Provider>
  );
};

const useUser = () => {
  return useContext(UserType);
};

export { UserType, UserContext, useUser };
