import GameCard from "../component/StorePage/GameCard";
import image from "../assets/laptop-on-desk.jpg";
import { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
function NewGameLayout({games}) {
  const newGame = games.slice(-4);
  const [imageURLs, setImageURLs] = useState({}); // Lưu trữ URL của từng game

  async function changeImageBlob(imageBinary) {
    try {
        // Nếu là binary, convert thành Blob
        const arrayBuffer = new Uint8Array(imageBinary);
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' }); // Sử dụng đúng loại MIME
        return URL.createObjectURL(blob);  // Trả về URL object từ Blob
      
    } catch (error) {
      console.error("Error processing image:", error);
      
    }
  }


  // Sử dụng useEffect để thay đổi ảnh khi games thay đổi
  useEffect(() => {
    const fetchImages = async () => {
      const images = await Promise.all(
        games.map(async (game) => {
          const imageURL = await changeImageBlob(game.image.data); // game.image là binary
          return { id: game._id, imageURL };
        })
      );
      // Cập nhật state với các URL của ảnh
      const imageMap = images.reduce((acc, { id, imageURL }) => {
        acc[id] = imageURL;
        return acc;
      }, {});
      setImageURLs(imageMap);
    };

    fetchImages();
  }, [games]);  // Khi games thay đổi thì sẽ tải lại ảnh
  return (
    <div className=" absolute flex flex-col   ">
      <h1 className="ml-10 text-3xl font-bold font font-press-start italic text-white    ">
        New <span className="gradient-text mr-6">Game</span>
      </h1>
      <div className="absolute flex mt-12 space-x-4  ">
     
        {newGame.map((game)=>{
              const imageURL = imageURLs[game._id]
          return (
            <Link key={game._id} to={`/games/${game._id}`}>
        <GameCard
         title={game.name}
         price={game.price===0 ?'Free':game.price+"$"}
         description={game.description}
         image={imageURL}
       /></Link>)
})}
      </div>
    </div>
  );
}
export default NewGameLayout;
