import IframeComponent from "../component/GameDetail/IframeComponent";
import FeedbackBar from "../component/GameDetail/FeedbackBar";
import ContentGame from "../component/GameDetail/ContentGame";
import OtherGame from "../component/GameDeTail/OtherGame";

import { defer, json, useLoaderData } from "react-router-dom";
import { Await } from "react-router-dom";
import { Suspense } from "react";
import HiddenDiv from "../component/Root/HiddenDiv";
import Loader from "../component/Root/Loader";
import { useSelector } from "react-redux";
function GameDetail() {
  const isVisible = useSelector((state)=>state.ui.showHiddenDiv); 
  const { loadGameDetail,loaderTenGame } = useLoaderData();

  return (
    <>
    {isVisible && <HiddenDiv />}
    <div className="bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50]">
      <Suspense fallback={<Loader />}>
        <Await resolve={loadGameDetail}>
          {(game) => (
            <>
              <div className="relative w-[99vw] h-[104vh]">
                <IframeComponent url={game.url} />
                <FeedbackBar game={game} />
              </div>
              <div className="h-auto w-full relative">
                <ContentGame game={game} />
              </div>
              <div className="h-96">
               <Suspense fallback={<Loader></Loader>}>
                <Await resolve={loaderTenGame} >
                  {tengames => <OtherGame games={tengames} />}
                
                </Await>
               </Suspense>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </div>
   </>
  );
}

async function loadGameDetail(gameId) {
  const response = await fetch(`http://localhost:3000/games/${gameId}`);
  if (!response.ok) {
    throw json({ message: "Not found game" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData;
  }
}
async function loaderTenGame() {
  const response = await fetch('http://localhost:3000/');
  if (!response.ok) {
    throw json({ message: "Not found game" }, { status: 500 });
  } 
  try {
    const resData = await response.json();
    console.log(resData);
    return resData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw json({ message: "Invalid JSON response" }, { status: 500 });
  }
}


export function loader({ request, params }) {
  const gameId = params.gameId;
  return defer({
    loaderTenGame : loaderTenGame() ,
    loadGameDetail: loadGameDetail(gameId),
  
  });
}
export default GameDetail;
