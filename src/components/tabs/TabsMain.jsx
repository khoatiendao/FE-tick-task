import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ActivityHistory from "../../pages/ActivityHistory";
import ProfileComponent from "../user/profileComponent";
import Setting from "../../pages/Setting";
import { useLocation, useNavigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabsMain = () => {
  const [value, setValue] = React.useState(0);
  const { pathname } = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    const isMatch = tabs.findIndex((item) => item.href === pathname);
    setValue(isMatch);
  }, [handleChange]);

  const tabs = [
    { label: "User Profile", href: "/manage-profile/profile" },
    { label: "Activity History", href: "/manage-profile/activity-history" },
    { label: "Setting", href: "/manage-profile/setting" },
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {tabs.map((tab, index) => (
            <Tab
              label={tab.label}
              {...a11yProps(index)}
              key={index}
              onClick={() => navigate(tab.href)}
            />
          ))}
        </Tabs>
      </Box>
      {/* <CustomTabPanel value={value} index={0}>
        <ProfileComponent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ActivityHistory />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Setting />
      </CustomTabPanel> */}
    </Box>
  );
};

export default TabsMain;
