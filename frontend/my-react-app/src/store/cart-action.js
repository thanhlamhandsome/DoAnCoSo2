import { cartAction } from "./cart-slice";
// Chỉnh sửa trong fetchCartData để kiểm tra và xử lý đúng Buffer



export const fetchCartData = () => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  return async (dispatch) => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/carts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load cart");
        }

        const resData = await response.json();
        console.log(resData); // Log dữ liệu để kiểm tra

      
        return processCartItems(resData);
      } catch (e) {
        console.error("Could not fetch cart data!", e);
        throw e;
      }
    };

    try {
      const data = await fetchData();
      console.log(data); // Kiểm tra dữ liệu nhận được từ API

      // Kiểm tra cấu trúc dữ liệu của response
      if (data && data.items) {
        dispatch(cartAction.replaceCart({ items: data.items }));
        dispatch(
          cartAction.updateTotalQuantityAndTotalPrice({
            totalQuantity: data.totalQuantity,
            totalPrice: data.totalPrice,
          })
        );
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (e) {
      console.error("Dispatch error in fetchCartData", e);
    }
  };
};

export const fechRemoveCart = (id) => {
  const token = localStorage.getItem('token'); 
  return async (dispatch) => {
    const removeCart = async () => {
      const response = await fetch("http://localhost:3000/removecart",{
        method : 'POST' , 
        headers : {
          'Content-Type' : 'application/json' , 
          Authorization : 'Bearer ' + token
        }
        ,
        body: JSON.stringify({id : id})
      });
      if (!response.ok) {
        throw new Error("Failed to load cart");
      }
      const resData = await response.json();
      console.log(resData)
      return processCartItems(resData);
    };

    try{
         const data = await removeCart() ; 
         if (data && data.items) {
          dispatch(cartAction.replaceCart({ items: data.items }));
          dispatch(
            cartAction.updateTotalQuantityAndTotalPrice({
              totalQuantity: data.totalQuantity,
              totalPrice: data.totalPrice,
            })
          );
        } else {
          console.error("Invalid data structure:", data);
        }
    }catch(e){
      console.error("Dispatch error in fetchCartData", e);
    }
  };
};
// Hàm xử lý hình ảnh và dữ liệu từ API
const processCartItems = (resData) => {
  if (!resData || !resData.carts) return resData;

  const updatedItems = resData.carts.map((item) => {
    const newItem = { ...item, id: item._id, price: item.price + "$" };

    // Xử lý hình ảnh nếu có
    if (item.image && item.image.data) {
      const buffer = item.image.data;
      const blob = new Blob([new Uint8Array(buffer)], {
        type: "image/jpeg",
      });
      newItem.image = URL.createObjectURL(blob); // Tạo URL cho ảnh
    }

    return newItem;
  });

  return { ...resData, items: updatedItems };
};
