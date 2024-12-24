import React, { useState } from "react";
import Sidebar from "./SideBar";
import UserLayout from "./UserLayout/UserLayout";
import GameLayout from "./GameLayout/GameLayout";
import TransactionLayout from "./TransactionLayout/TransactionLayout";
import AdminLayoutChild from "./AdminLayout/AdminLayoutChild";
import FormAddAdmin from "./AdminLayout/FormAddAdmin";
import Login from "./Login";
import { uiAction } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import HiddenDiv from "../Root/HiddenDiv";
import { useSelector } from "react-redux";
const AdminLayout = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.ui.showHiddenDiv);
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (isVisible) {
    console.log(isVisible);
  }
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.reload();
    
    
  };
  
  const [currentLayout, setCurrentLayout] = useState(0);

  const layouts = [
    { name: "Dashboard", content: <div>Welcome to Dashboard</div> },
    { name: "Users", content: <UserLayout /> },
    { name: "Games", content: <GameLayout /> },
    { name: "Transactions", content: <TransactionLayout /> },
    { name: "Admin", content: <AdminLayoutChild /> },
    { 
      name: "Logout", 
      content: null, 
      action: handleLogout, // Gán hành động đăng xuất
    },
  ];
  React.useEffect(() => {
    if (layouts[currentLayout]?.action) {
      layouts[currentLayout].action();
    }
  }, [currentLayout]);
 
  return (
    <>
      {isVisible && <HiddenDiv></HiddenDiv>}
      {admin ? (
        <div className="flex">
          <Sidebar
            layouts={layouts}
            onLayoutChange={(index) => setCurrentLayout(index)}
          />

          {/* Main Layout Content */}
          <div className="flex-1 p-7 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">
              {layouts[currentLayout].name}
            </h1>
            <div>{layouts[currentLayout].content}</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 shadow-md rounded-md">
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;
