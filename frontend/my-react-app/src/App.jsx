import { createBrowserRouter, useLocation } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import StorePage from "./pages/StorePage";
import {action as logoutAction } from './pages/LogoutPage'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";
import {tokenLoader} from "./util/auth";
import {action as actionAbate} from './component/Root/CheckoutModal' ; 
import {loader as loaderGameDetail} from './pages/GameDetail'
import { loader as loaderForHomePage } from "./pages/HomePage";
import {action as actionSignUp} from './pages/SignUpPage'
import {loader as loadGames} from './pages/StorePage'; 
import {loader as loaderUserProfile} from './pages/MyProfile'
import GameDetail from "./pages/GameDetail";
import MyProfilePage from "./pages/MyProfile";
import AdminPage from "./pages/AdminPage";
import { useState,useEffect } from "react";
import {loader as loaderAdmin} from './pages/AdminPage';
import {action as actionAdmin} from './pages/AdminPage';
import DeveloperPage from "./pages/DeleloperPage";

function App() {

  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);
  console.log(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      loader : tokenLoader,
      errorElement : ErrorPage,
      children : [
        {
          index: true , 
          element :<HomePage />,
          id: "ten-games",
          loader : loaderForHomePage

        },
        {
          path:'store', 
          element: <StorePage />,
          id : 'loader-game' , 
          loader : loadGames , 
          action : actionAbate
        },
        {
          path:'games/:gameId', 
          element: <GameDetail/>,
          loader: loaderGameDetail
        },{
          path:'/myprofile' , 
          element : <MyProfilePage></MyProfilePage>, 
          loader : loaderUserProfile,
        
        },{
          path:'/developer' , 
          element : <DeveloperPage></DeveloperPage>, 
          
        
        }
        
       
      ],
    
    },
    {
      path:'/login', 
      element: <LoginPage />,
   
    },
  
    {
      path:'/signup', 
      element: <SignUpPage />, 
      action : actionSignUp
    },{
      path: '/logout', 
      action: logoutAction
      
    },{
      path: '/admin', 
      element: <AdminPage />,
      loader : loaderAdmin , 
      action : actionAdmin
      
    }

  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
