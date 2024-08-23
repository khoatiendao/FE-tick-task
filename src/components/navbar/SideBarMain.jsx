import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Groups2Icon from "@mui/icons-material/Groups2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

const SideBarMain = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    {title: "Board", icon: <DashboardIcon/>},
    {title: "Member", icon: <GroupAddIcon/>},
    {title: "Schedule", icon: <CalendarMonthIcon/>},
    {title: "Chat", icon: <ChatIcon/>, gap: true},
    {title: "Analytics", icon: <SignalCellularAltIcon/>},
    {title: "Setting", icon: <SettingsIcon/>, gap: true}
  ];
  return (
    <div className="flex">
      <div className={` ${open ? "w-72" : "w-16"} duration-300 h-screen p-4 pt-4 bg-gray relative`}>
        <span className={`absolute cursor-pointer rounded-3xl -right-3 top-2 w-7 border-2 bg-white ${!open && "rotate-180"}`}onClick={() => setOpen(!open)}>
          <KeyboardArrowLeftIcon fontSize="medium" />
        </span>
        <div className={`flex gap-x-4 items-center origin-left duration-300 rounded-md cursor-pointer`}>
          <span>
            <Groups2Icon />
          </span>
          <p className={`text-black font-normal text-sm ${!open && "scale-0"}`}>
            Department Marketing
          </p>
        </div>
        <ul className="pt-6">
            {Menus.map((menu, index) => (
                <li className={` text-black text-sm flex items-center gap-x-4 cursor-pointer p-1 hover:bg-metal rounded-md ${menu.gap ? "mt-9" : "mt-2"}`} key={index}>
                    <span>{menu.icon}</span>
                    <span className={`${!open && "hidden"} origin-left duration-300`}>{menu.title}</span>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBarMain;
