import SiderBar from "../component/StorePage/SiderBar";
import ImageGame from "../assets/ImageGame.png";
import TopImage from "../component/StorePage/TopImage";
import NewGameLayout from "../layouts/NewGame";
import AllGame from "../layouts/AllGame";
import BottomImage from "../component/StorePage/BottomImage";
import AllVideo from "../layouts/AllVideo";
import EndImage from "../layouts/EndImage";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HiddenDiv from "../component/Root/HiddenDiv";
import { checkAuthLoader } from "../util/auth";
import { fetchCartData } from "../store/cart-action";
import { uiAction } from "../store/ui-slice";
import {
  Await,
  json,
  useLoaderData,
  defer,
  useActionData,
} from "react-router-dom";
import Loader from "../component/Root/Loader";
function Store() {
  const dispatch = useDispatch();
  const paymentResult = useActionData();
  const isVisible1 = useSelector((state) => state.ui.showHiddenDiv);
  const message = useSelector((state) => state.ui.message);
   console.log({ isVisible1, message, status });

  useEffect(() => {
    if (paymentResult) {
      console.log('Payment result:', paymentResult);
      dispatch(uiAction.hideShowCheckoutModal());
       alert("Thanh toán thành công"); 
       window.location.reload();
    }
  }, [paymentResult, dispatch]);


  const isVisible = useSelector((state) => state.ui.showHiddenDiv);
  const authennicateUser = localStorage.getItem("authennicateUser");
  if (authennicateUser) {
    console.log("dang nhap");
  }

  useEffect(() => {
    if (authennicateUser) {
      dispatch(fetchCartData());
    }
  }, [dispatch, authennicateUser]);
  const { loadGame } = useLoaderData();

  return (
    <>
      {isVisible && <HiddenDiv />}
      <div className={` flex relative  space-x-10 bg-[#121B24] `}>
        <div className="w-72  top-0 left-0 mt-8">
          <SiderBar />
        </div>
        <div className="w-full">
          <div className=" h-80 bg-slate-500 w-[90%] mt-6">
            <TopImage imageUrl={ImageGame} />
          </div>
          <div className="  h-[420px] w-[78%]  mt-8  ">
            <Suspense
              fallback={
                <div>
                  <Loader></Loader>
                </div>
              }
            >
              <Await resolve={loadGame}>
                {(games) => <NewGameLayout games={games} />}
              </Await>
            </Suspense>
          </div>

          <Suspense
            fallback={
              <div>
                <Loader></Loader>
              </div>
            }
          >
            <Await resolve={loadGame}>
              {(games) => (
                <div className="w-full mt-6 h-auto">
                  <AllGame games={games} />
                </div>
              )}
            </Await>
          </Suspense>
          <div className="w-full h-96">
            <BottomImage />
          </div>
          <div className="w-full h-80">
            <AllVideo />
          </div>
          <div className="w-full h-96 ">
            <EndImage />
          </div>
        </div>
      </div>
    </>
  );
}
async function loaderGame() {
  const token = localStorage.getItem('token');
  const response = await fetch("http://localhost:3000/store");
  if (!response.ok) {
    throw json({ message: "Failed to fetch Game " }, { status: 500 });
  } else {
    let resData = await response.json();
    const gamePaid = await fetch('http://localhost:3000/getPaidGame',{
      method : 'GET', 
      headers: {
        Authorization : 'Bearer '+ token
      }
    })
    const gamePaidData = await gamePaid.json();
    console.log(gamePaidData)
    resData.forEach((game)=>{
        gamePaidData.forEach((gamePaid)=>{
          if(game._id === gamePaid){
            game.price= 0 ; 
            game.isPaid=false;
          }
        })
    })
    return resData;
  }
}

export async function loader({ request, params }) {
  const authResult = await checkAuthLoader(); // Gọi checkAuthLoader

  if (authResult) {
    return authResult; // Nếu checkAuthLoader trả về redirect, dừng tại đây
  }

  return defer({
    loadGame: loaderGame(), // Tiếp tục tải dữ liệu nếu đã xác thực
  });
}

export default Store;
