import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import Nav from "./Nav.jsx";
import ButtonLogin from "./ButtonLogin.jsx";
import UserProfile from "./UserProfile.jsx";

import CustomizedBadges from "./CustomizedBadges.jsx";

import { useLocation } from "react-router-dom";
import Balence from "./Balence.jsx";

function Header() {
  const location = useLocation();
  const authennicate = localStorage.getItem("authennicateUser");

  const accessStore = location.pathname === "/store";
  return (
    <header className="  h-20 bg-black relative">
      <Link to="/">
        <div className="ml-5  w-56 h-20  absolute">
          <img className="h-full w-full object-fill" src={logo} alt="" />
        </div>
      </Link>
      <div className="h-full left-[17%]  w-[55%] absolute flex justify-start items-center space-x-7">
        <Nav link="store" title="Store" />
        <Nav title="Communicate" />
        <Nav link="/developer" title="Developer" />
        <Nav title="Contact" />
      </div>
      <div
        className={`w-10 h-10  absolute top-4 right-64 ${
          accessStore && authennicate ? "bg-yellow-300" : ""
        }`}
      >
        {accessStore && authennicate && <CustomizedBadges />}
      </div>

      {authennicate && (
        <div className="   h-8 w-28 right-80 mr-4 absolute  top-6 ">
          <Balence></Balence>
        </div>
      )}
      <div
        className={` absolute h-14 mt-3 w-48  right-8 rounded-full ${
          authennicate ? "bg-gradient-to-r from-cyan-400 to-purple-600" : ""
        } `}
      >
        {authennicate ? (
          <UserProfile />
        ) : (
          <Link to="login" className="absolute h-14 mt-1  w-48  rounded-full">
            <ButtonLogin />
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
