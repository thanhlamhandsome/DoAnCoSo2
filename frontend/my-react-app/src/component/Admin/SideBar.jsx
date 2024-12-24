import React from "react";

const Sidebar = ({ layouts, onLayoutChange }) => {
  return (
    <div className="w-52 bg-gray-800 text-white  h-screen">
      <div className="p-4 font-bold text-xl border-b border-gray-700">Admin Panel</div>
      <ul className="mt-4 space-y-2">
        {layouts.map((layout, index) => (
          <li
            key={index}
            onClick={() => onLayoutChange(index)}
            className="cursor-pointer px-4 py-2 hover:bg-gray-700 rounded"
          >
            {layout.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
