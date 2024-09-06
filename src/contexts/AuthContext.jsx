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

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token')
    if(!token) return null;
    
    const decodedToken = jwtDecode(token)
    console.log(decodedToken);
    return decodedToken._id
  }

  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    district: "",
    ward: ""
  })

  useEffect(() => {
    const fetchData = async() => {
      const _id = getUserIdFromToken();
      const response = await getRequest(`${baseUrlUser}/${_id}`)
      console.log(response);
      

      if(response.error) {
        failed('Get user profile failed')
      }

      const data = await response.json()
      setUserData({
        name: data.name,
        gender: data.gender,
        phone: data.phone,
        country: data.country,
        address: data.address,
        city: data.city,
        district: data.district,
        ward: data.ward
      })
      success('Get user profile success')
      fetchData()
    }
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
        isLoginLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
