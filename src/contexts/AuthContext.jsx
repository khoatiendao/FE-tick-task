import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrlUser, getRequest, postRequest } from "../utils/service";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



const success = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};
const failed = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    country: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    photo: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState(null)

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('User')
    if(!token) return null;
    const decodedToken = jwtDecode(token)
    return decodedToken._id
  }

  useEffect(() => {
    const fetchData = async() => {
      const _id = getUserIdFromToken();
      const response = await getRequest(`${baseUrlUser}/${_id}`)
      
      if(!response.status) {
        throw new Error('Error fetching user data')
      }
      
      setUserData({
        name: response.data.user.name,
        gender: response.data.user.gender,
        phone: response.data.user.phone,
        country: response.data.user.country,
        address: response.data.user.address,
        city: response.data.user.city,
        district: response.data.user.district,
        ward: response.data.user.ward,
        photo: response.data.user.photo
      })
    }
    fetchData()
  },[])

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      const toastId = toast.loading("Registering....", {
        position: "top-center",
      });
      const response = await postRequest(
        `${baseUrlUser}/register`,
        JSON.stringify(registerInfo)
      );

      if (response.error) {
        toast.update(toastId, {
          render: response.message || "Registration failed!",
          position: "top-center",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
        return setRegisterError(response);
      }

      toast.update(toastId, {
        render: "Please check your email to verify your account.",
        position: "top-center",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      }, setTimeout(() => {
        navigate('/login')
      }, 2800));
    },
    [registerInfo]
  );

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      const response = await postRequest(
        `${baseUrlUser}/login`,
        JSON.stringify(loginInfo)
      );
      setIsLoginLoading(false);
      if (response.error) {
        failed(response.message);
        return setLoginError(response);
      }
      success("Login Successfull");
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginInfo,
        loginError,
        updateLoginInfo,
        isLoginLoading,
        userData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
