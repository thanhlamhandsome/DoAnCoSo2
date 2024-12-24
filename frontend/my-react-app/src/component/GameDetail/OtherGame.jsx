import { uiAction } from "../../store/ui-slice";
import CartGame from "../HomePage/CartGame";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function OtherGame({ games }) {
  console.log(games);
  const gameIdsToDisplay = games.slice(0, 5);
  console.log(gameIdsToDisplay);
  const dispatch = useDispatch();
  return (
    <>
      <div className="">
        <h1 className="font-press-start mb-6 font-bold text-3xl mt-3 ml-8 bg-gradient-to-r from-[#fc466b] to-[#3f5efb] text-transparent bg-clip-text">
          OTHER GAME
        </h1>

        <div className="flex ">
          {gameIdsToDisplay.map((game) => {
            return (
              <Link
              key={game._id}
                to={`../games/${game._id}`}
                onClick={(e) => {
                  if (game.isPaid === true && game.price !== 0) {
                    e.preventDefault();
                    return dispatch(
                      uiAction.setShowHiddenDiv({
                        status: "error",
                        message: "You need to buy before play",
                      })
                    );
                  }
                }}
              >
                <CartGame  game={game} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default OtherGame;
