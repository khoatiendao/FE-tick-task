import React from "react";
import NavbarMain from "../components/navbar/NavbarMain";
import SideBarMain from "../components/navbar/SideBarMain";
import Schedule from "./Schedule";

const Homepage = () => {
  return (
    <div>
      <NavbarMain />
      <div className="flex">
      <SideBarMain />
        <Schedule />
        fsdjaklfjasdklfjasdklfjasdklj
      </div>
    </div>
  );
};

export default Homepage;
