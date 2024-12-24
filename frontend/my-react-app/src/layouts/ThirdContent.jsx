import testImage from "../assets/homeImage.png";
import CardGame from "../component/HomePage/CartGame";
import { Link, useLoaderData } from "react-router-dom";
function ThirdContent(){
    const games = useLoaderData();
    const gameIdsToDisplay = games.slice(0, 7);
    const user = JSON.parse(localStorage.getItem('user')); 
 return (

    <div className="h-[990px] relative bg-slate-950   ">
    <h1 className="text-[60px] font-bold ml-32 text-white font-press-start ">
      Our Game
    </h1>
    <div className=" h-[90%] absolute bottom-0 grid grid-flow-row-dense grid-cols-4 w-[90%] ml-12  ">
      <img
        className="col-span-2 row-span-2 h-[580px]"
        src={testImage}
        alt=""
      />
      <div></div>
      {gameIdsToDisplay.map((game) => {
        return <Link to={user?`/games/${game._id}`:'/login'}><CardGame key={game._id} game={game}></CardGame></Link>;
      })}
    </div>
  </div>
 )
}
export default ThirdContent