import GameCard from "./GameCard";
import FormAddGame from "./FormAddGame"; // Import FormAddGame
import { Suspense, useState } from "react";
import { Await, json, useLoaderData } from "react-router-dom";
import Loader from "../../Root/Loader";

const GameLayout = () => {
  const [showForm, setShowForm] = useState(false);
  const [game,selectGame] = useState({});
  const {loaderGame}= useLoaderData()
 

  const handleEdit = (game) => {
    selectGame(game);
    setShowForm(true);
  };

  const  handleDelete =async (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      const response = await fetch("http://localhost:3000/game",{
        method: "delete", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: id })
      })
      if(!response.ok){
        throw json({message: "Delete game failed"}); 
      }
      const resData = await response.json();
      window.location.reload(); 
      return resData ; 
    }
  };

  const handleSaveGame = (newGameData) => {
    setGames((prevGames) => [...prevGames, { ...newGameData, id: prevGames.length + 1 }]);
    setShowForm(false); // Sau khi lưu, đóng form
    selectGame({}); // Reset game state khi lưu hoặc quay lại for
  
  };
  const handleBack = () => {
    setShowForm(false);
    selectGame({}); // Xóa game khỏi state khi quay lại
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Game Management</h1>
        <button
          className={`px-6 py-2 rounded-lg text-white font-semibold shadow ${
            showForm
              ? "bg-gray-600 hover:bg-gray-500"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
          onClick={() => (showForm ? handleBack() : setShowForm(true))}
        >
          {showForm ? "Back" : "Add Game"}
        </button>
      </div>

      {/* Content */}
      {showForm ? (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add New Game</h2>
          <FormAddGame onSave={handleSaveGame} gameData={game} /> {/* Hiển thị form khi showForm là true */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">


          <Suspense fallback={<Loader></Loader>}>
            <Await resolve={loaderGame}>
                   {games=> games.map((game)=>(
                    <GameCard
                    key={game._id}
                    game={game}
                    onEdit={()=>handleEdit(game)}
                    onDelete={()=>handleDelete(game._id)}
                  />
                   ))}
            </Await>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default GameLayout;
