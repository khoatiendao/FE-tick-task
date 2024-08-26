import React from "react";

const Avatar = ({ src }) => {
  return (
    <div className="max-w-xl">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
      />
    </div>
  );
};

export default Avatar;
