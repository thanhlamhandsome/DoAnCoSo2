  import { Link } from "react-router-dom";
  import GameCard from "../component/StorePage/GameCard";
  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { uiAction } from "../store/ui-slice";
  import HiddenDiv from "../component/Root/HiddenDiv";

  function AllGame({ games }) {
    const [imageURLs, setImageURLs] = useState({}); // Store the URL of each game's image
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.ui.showHiddenDiv);
    const status = useSelector((state) => state.ui.status);
    const minValue = useSelector((state) => state.ui.minValue);
    const maxValue = useSelector((state) => state.ui.maxValue);
    const genresSearch = useSelector((state) => state.ui.genresSearch);

    // Function to change image binary data to URL
    async function changeImageBlob(imageBinary) {
      try {
        if (!imageBinary) {
          throw new Error("Image data is empty or undefined");
        }
        const arrayBuffer = new Uint8Array(imageBinary);
        const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error("Error processing image:", error);
        return null; // Return null if there's an error
      }
    }

    // UseEffect to change the image URLs when games change
    useEffect(() => {
      const fetchImages = async () => {
        const images = await Promise.all(
          games.map(async (game) => {
            const imageURL = await changeImageBlob(game.image.data); // game.image is binary
            return { id: game._id, imageURL };
          })
        );
        // Update state with the image URLs
        const imageMap = images.reduce((acc, { id, imageURL }) => {
          acc[id] = imageURL;
          return acc;
        }, {});
        setImageURLs(imageMap);
      };

      fetchImages();
    }, [games]); 

    const filteredGames = games.filter((game) => {
      // Nếu game trả phí (isPaid = true), chỉ kiểm tra giá trị giá (price > 0)
      // Nếu game miễn phí (price = 0), luôn được hiển thị
      const isPriceInRange =
        game.isPaid
          ? game.price > 0 
          : game.price >= minValue && game.price <= maxValue; 
    
      // Lọc theo thể loại nếu có
      const isGenreMatch =
        genresSearch.length > 0 ? genresSearch.includes(game.genre) : true;
    
      return isPriceInRange && isGenreMatch;
    });
    
    return (
      <>
        {isVisible && <HiddenDiv />}
        <div>
          <h1 className="ml-10 text-3xl font-bold font font-press-start italic text-white">
            All <span className="gradient-text mr-6">Game</span>
          </h1>
          <div>
            <ul className="grid grid-cols-4 grid-flow-row-dense mt-4">
              {filteredGames.map((game) => {
                const imageURL = imageURLs[game._id];
                return (
                  <Link
                    key={game._id}
                    to={game.isPaid ? "#" : `/games/${game._id}`}
                  >
                    <li key={game._id}>
                      <GameCard
                        image={imageURL}
                        title={game.name}
                        id={game._id}
                        description={game.description}
                        price={game.price === 0 ? "Free" : game.price + "$"}
                        isPaid={game.isPaid}
                      />
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }

  export default AllGame;
