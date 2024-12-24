import { useEffect, useState } from 'react';
import image from '../../assets/laptop-on-desk.jpg'
function ContentGame({game}) {
    const [imageUrl, setImageUrl] = useState(null);
    
    useEffect(() => {
        console.log(game)
        const changeBinaryToImage = async () => {
            try {
                const imageBlob = new Blob([new Uint8Array(game.image.data)], { type: 'image/png' });
                const url = URL.createObjectURL(imageBlob);
                setImageUrl(url);
            } catch (e) {
                console.error('Failed to Fetch Image:', e);
            }
        };

        changeBinaryToImage();

        // Cleanup URL when component unmounts or game changes
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [game]);
    return (
        <div className="relative p-10 rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold text-[#f39c12] mb-6 text-center">
                {game.name}
            </h1>
            <h2 className="text-2xl font-bold text-blue-300 mb-4 text-center">
                Description
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed text-center mb-6  w-[50%] ml-80">
             {game.description}
            </p>
            <img 
                src={imageUrl} 
                alt="Game preview" 
                className="rounded-lg shadow-2xl mx-auto hover:scale-105 transition-transform duration-500 w-[40%] h-72"
            />
        </div>
    );
}



export default ContentGame