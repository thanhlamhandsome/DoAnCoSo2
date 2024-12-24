import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../store/ui-slice";
import { useNavigation } from "react-router-dom";

function ItemShoppingLayout() {
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigation = useNavigation(); 
  const showItemShoppingLayout = useSelector(
    (state) => state.ui.showItemShoppingLayout
  );
  const dispatch = useDispatch();

  function handleShowCheckoutModal() {
    dispatch(uiAction.setShowCheckoutModal());
    dispatch(uiAction.hideShowItemShoppingLayout());
  }

  return (
    <>
      {showItemShoppingLayout && (
        <div className="absolute z-50 h-auto w-64 right-0 bg-blue-500 rounded-2xl py-4 top-24">
          <h1 className="font-bold text-white mb-4 text-center">
            Your Shopping Cart
          </h1>
          <ul className="space-y-4 overflow-y-auto max-h-96 w-full bg-yellow-300 px-2">
          {items.length === 0 && <p>Your Cart Shoping is Empty</p>}
             { items.map((item) => (
              
                <li key={item.id}>
                  <CartItem
                    item={{
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      id: item.id,
                    }}
                  />
                </li>
              ))
      }
            
          </ul>
          {/* Total Price */}
          <div className="mt-2 mb-2 text-white text-center font-bold">
          {navigation.state==='loading' ?<span>isLoading...</span>:<span>Total: {totalPrice}$</span>}
            
          </div>
          {/* Checkout Button */}
          <div className=" flex justify-center">
            <button
              onClick={handleShowCheckoutModal}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemShoppingLayout;
