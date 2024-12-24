import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/cart-slice";
import { fechRemoveCart } from "../store/cart-action";
import { useNavigation } from "react-router-dom";
function CartItem({ item }) {
  const navigation = useNavigation(); 
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleDecrease = ({item}) => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
    dispatch(cartAction.removeItem(item.id))
    dispatch(fechRemoveCart(item.id));
  };

 

  return (
    <div className="flex items-center bg-white rounded-lg shadow-md w-full h-24 py-3 mb-3">
      {/* Hình ảnh sản phẩm */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg mr-4"
      />

      {/* Nội dung sản phẩm */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold  mb-2 max-w-[200px] relative">
          {item.name}
        </h3>
        <p className="text-gray-500 mb-1" >
          Price:{" "}
          <span className="font-bold">
          {item.price}
          
          </span>
        </p>
      </div>

      {/* Nút điều khiển */}
      <div className="flex items-center space-x-2 mr-3 mt-5">
        <button
          onClick={()=>handleDecrease({item})}
          className="w-6 h-8 bg-red-500 text-white flex items-center justify-center rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default CartItem;
