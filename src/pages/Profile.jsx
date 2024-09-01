import React, { useEffect } from "react";
import Avatar from "../components/avatar/Avatar";
import TabsMain from "../components/tabs/TabsMain";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = (props) => {
  const { index } = props;
  
  return (
    <div>
      <div className="flex items-center pr-14 pt-14 pb-14 pl-16">
        <Avatar />
        <div className="pl-8">
          <h1>Nguyễn Anh Khoa khoa khoa khoa</h1>
          <h1 className="">Backend Developer</h1>
        </div>
      </div>
      <div className="pl-16 pr-14">
        <TabsMain />
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
