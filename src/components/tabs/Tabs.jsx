import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("User Profile");
  const TabsLable = [
    { title: "User Profile", href: "/profile" },
    { title: "Activity History", href: "/activity" },
    { title: "Setting", href: "/setting" },
  ];
  return (
    <div>
      <div className="flex items-start pb-2 border-b-2 border-gray">
        {TabsLable.map((tab, index) => (
          <a
            href={tab.href}
            key={index}
            onClick={() => setActiveTab()}
            className={`py-2 pr-5 ${activeTab === tab ? "text-bubble-gum border-b-2 hover:border-black" : "text-bubble-gum hover:text-black"} `}>
            {tab.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
