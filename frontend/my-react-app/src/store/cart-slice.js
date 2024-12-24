import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice : 0 ,
    totalQuantity : 0,
  },
  reducers: { 
    replaceCart: (state, action) => {  
      state.items = action.payload.items; // Cập nhật lại danh sách item trong giỏ hàng
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      console.log(newItem)
      const exitsItem = state.items.find((item) => {
        return item.id === newItem.id;
      });
  
      if (!exitsItem) {
        state.items.push({
          id: newItem.id,
          image : newItem.image ,
          name: newItem.name,
          price: newItem.price,
        });
        state.totalQuantity ++;
        const numberPrice  = newItem.price.replace("$",'')
        state.totalPrice+= Number.parseInt(numberPrice) ; 
      } 
     
    
   
    },
    updateTotalQuantityAndTotalPrice : (state,action)=>{
      state.totalQuantity  = action.payload.totalQuantity  ; 
      state.totalPrice = action.payload.totalPrice;
    }, 
    removeItem: (state, action) => {
      const itemId = action.payload;
      const indexItem = state.items.findIndex((item) => {
        return item.id === itemId;
      });
      const item = state.items[indexItem]
      if (indexItem !== -1) {
          state.items.splice(indexItem, 1);
      }
      state.totalQuantity --
      state.totalPrice -= item.price
    },
  },
});

export default cartSlice; 
export const cartAction = cartSlice.actions