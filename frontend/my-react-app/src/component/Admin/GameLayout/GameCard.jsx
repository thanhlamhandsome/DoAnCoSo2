import { useState } from "react";

const GameCard = ({ game, onEdit, onDelete }) => {
  const [isUrlHovered, setIsUrlHovered] = useState(false);
  const [isDescriptionHovered, setIsDescriptionHovered] = useState(false);

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden flex flex-col">
      {/* Game Image */}
      <img 
        src={game.image}
        alt={game.name}
        className="h-56 w-full object-fill"
      />

      {/* Game Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Game Name */}
        <h2 className="text-xl font-bold text-gray-800">{game.name}</h2>

        {/* Game Description with smooth effect */}
        <p
          className={`text-sm text-gray-600 transition-all duration-300 ease-in-out ${isDescriptionHovered ? "whitespace-normal" : "truncate"}`}
          title={game.description}
          onMouseEnter={() => setIsDescriptionHovered(true)}
          onMouseLeave={() => setIsDescriptionHovered(false)}
        >
          {game.description}
        </p>

        {/* Pricing Tag and Genre */}
        <div className="flex items-center justify-between mt-3">
          <span
            className={`px-3 py-1 text-sm font-semibold rounded ${
              game.isPaid ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}
          >
            {game.isPaid ? `$${game.price.toFixed(2)}` : "Free"}
          </span>
          <span className="text-sm text-gray-500 italic">{game.genre}</span>
        </div>

        {/* Like/Dislike Section */}
        <div className="mt-3 flex items-center justify-around text-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-green-600">👍</span>
            <span className="text-xl font-extrabold">{game.like}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-red-600">👎</span>
            <span className="text-xl font-extrabold">{game.dislike}</span>
          </div>
        </div>

        {/* Game URL with truncated text */}
        <div
          className="mt-2"
          onMouseEnter={() => setIsUrlHovered(true)}
          onMouseLeave={() => setIsUrlHovered(false)}
        >
          <span className="text-sm text-gray-500 font-medium">URL: </span>
          <p
            className={`text-sm ${isUrlHovered ? "text-blue-600" : "text-blue-500"} break-words transition-all duration-300 ease-in-out ${isUrlHovered ? "whitespace-normal" : "truncate"}`}
            title={game.url}
          >
            {game.url}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 flex space-x-4">
          <button
            onClick={() => onEdit(game.id)}
            className="flex-grow bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-400"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(game.id)}
            className="flex-grow bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
