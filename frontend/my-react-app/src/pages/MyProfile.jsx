import UserDetail from "../component/MyProflePage/UserDetail";
import { useState } from "react";
import HiddenDiv from '../component/Root/HiddenDiv'
import FavoriteGames from "../component/MyProflePage/FavoriteGames";
import PurchaseHistory from "../component/MyProflePage/PurchaseHistory";
import EditProfile from "../component/MyProflePage/EditProfile";
import {
  Await,
  useLoaderData,
  defer,
  json,

} from "react-router-dom";

import { Suspense } from "react";
import Loader from "../component/Root/Loader";
import { useSelector } from "react-redux";
function MyProfilePage() {
  const [activeLayout, setActiveLayout] = useState("editProfile");
  const isVisible =useSelector(state=>state.ui.showHiddenDiv)
  const { loaderUserProfile, loaderFavouritGame ,loaderTransaction} = useLoaderData();

  return (
    <>
    {isVisible && <HiddenDiv></HiddenDiv>}
    <div>
      <div className="w-full h-[15vh] bg-[#201D27] relative flex items-center">
        <UserDetail />
      </div>
      <div className="w-full h-16 bg-[#23202A] flex justify-center items-center gap-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeLayout === "editProfile"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
          }`}
          onClick={() => setActiveLayout("editProfile")}
        >
          Edit Profile
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeLayout === "purchaseHistory"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
          }`}
          onClick={() => setActiveLayout("purchaseHistory")}
        >
          Lịch sử mua game
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeLayout === "favoriteGames"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
          }`}
          onClick={() => setActiveLayout("favoriteGames")}
        >
          Game yêu thích
        </button>
      </div>

      {/* Layout Section */}
      <div className="w-full bg-gray-100 min-h-[50vh]">
        {activeLayout === "editProfile" && (
          <Suspense fallback={<Loader />}>
            <Await resolve={loaderUserProfile}>
              {(data) => <EditProfile data={data}></EditProfile>}
            </Await>
          </Suspense>
        )}

        {activeLayout === "purchaseHistory" && (
          <Suspense fallback={<Loader/>}>
            <Await resolve={loaderTransaction}>
              {(data)=><PurchaseHistory transactions={data} />}  
            </Await>
          </Suspense>
        )}
        {activeLayout === "favoriteGames" && (
          <Suspense fallback={<Loader />}>
            <Await resolve={loaderFavouritGame}>
              {
               (data)=>{
                 const  games = BlobifyImages(data);
                return  <FavoriteGames games={games} />
               }
              }
              
            </Await>
          </Suspense>
        )}
      </div>
    </div>
    </>
  );
}
 export function  BlobifyImages (games){
  return games.map((game)=>{

    const buffer = game.image.data  ; 
    const blob = new Blob([new Uint8Array(buffer)],{
      type : 'image/jpeg'
    })
    return {
      ...game , 
      image : URL.createObjectURL(blob)
    }
  })
}
async function  loaderTransaction() {
  const token = localStorage.getItem('token'); 
  const responese =await fetch('http://localhost:3000/trasaction',{
    headers:{
      Authorization : "Bearer " + token
    }
  }) ; 
  if(!responese.ok){
    throw json({message : 'Failed to Load Transaction'}); 
  }
  const resData = await responese.json(); 
  console.log(resData) ; 
  return resData;

  
}



async function loaderUserProfile() {
  try {
    const token = localStorage.getItem("token");
    const responese = await fetch("http://localhost:3000/myprofile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!responese.ok) {
      throw json({ message: "Failed to load Your Profile" }, { status: 500 });
    }
    const resData = await responese.json();
    console.log(resData);

    return resData;
  } catch (e) {
    console.log(e);
  }
}

async function loaderFavouritGame() {
  const token = localStorage.getItem("token");
  const responese = await fetch("http://localhost:3000/getfavouritegame", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const resData = await responese.json();
  console.log(resData);
  return resData;
}

export async function loader() {
  return defer({
    loaderUserProfile: loaderUserProfile(),
    loaderFavouritGame: loaderFavouritGame(),
    loaderTransaction : loaderTransaction(),
  });
}

export default MyProfilePage;
