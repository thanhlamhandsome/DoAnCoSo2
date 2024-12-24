import { useState,useEffect } from 'react';
import ButtonPlayNow from './ButtonPlayNow'
function CartGame({game}){
    
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
      const fetchImage = async () => {
        try {
          const response = await fetch(`http://localhost:3000/games/${game._id}/image`);
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setImageUrl(imageUrl);
        } catch (e) {
          console.error('Không thể tải hình ảnh:', e);
        }
      };
  
      fetchImage();
  
      // Hàm cleanup để giải phóng bộ nhớ của object URL
      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    }, [game]); // Bao gồm `imageUrl` trong mảng phụ thuộc để đảm bảo cleanup hiệu quả
   return (
    <div className="bg-[rgb(25,24,31)] h-[260px] w-60 rounded-[30px] relative ml-11" > 
        <img className='h-[62%] w-[60%] mt-3 object-cover absolute rounded-[30px] left-[20%]' src={imageUrl} alt="" />
         <h1 className={`absolute bottom-12 font-bold text-lg left-7 text-white text-nowrap ${game.name.length<15 ? 'left-11':""} `}>{game.name}</h1>
         <ButtonPlayNow  />
    </div>
   )
}
export default CartGame