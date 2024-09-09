import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Avatar = () => {
  const {userData} = useContext(AuthContext)
  
  return (
    <div className="max-w-xl">
      {userData ? 
      <img
        alt=""
        // src={userData.photo}
        className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
      /> : <p>Loading...</p>
      }
    </div>
  );
};

export default Avatar;
