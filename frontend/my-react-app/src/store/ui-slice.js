import { createSlice } from "@reduxjs/toolkit";
const uislice = createSlice({
    name: 'ui', 
    initialState:{
        showHiddenDiv : false , 
        showCheckoutModal : false,
        showItemShoppingLayout: false,
        message : '', 
        status : '',
        updateAvatar : '', 
        genresSearch : [], 
        minValue : 0 , 
        maxValue : 0 
    },
    reducers:{
        setUpdateAvatar : (state,action)=>{
            console.log(state.updateAvatar)
          state.updateAvatar = action.payload.avatar 
        },
        handleSearch: (state, action) => {
            const { genres, minValue, maxValue } = action.payload;
            console.log(genres)
            // Kiểm tra và gán giá trị mặc định nếu không có
            state.genresSearch = genres || [];
            state.minValue = minValue !== undefined ? minValue : 0;
            state.maxValue = maxValue !== undefined ? maxValue : 100;
        }
        ,
        setShowHiddenDiv: (state, action) => {
            state.showHiddenDiv = true;
            state.message = action.payload.message;
            state.status = action.payload.status;
          },
          hiddenHiddenDiv: (state) => {
            console.log('ádsadsa')
            state.showHiddenDiv = false;
            state.message = '';
            state.status = '';
          }
,          
        setShowCheckoutModal : (state)=>{
            state.showCheckoutModal = true ;
            
        },
        hideShowCheckoutModal : (state)=>{
            state.showCheckoutModal = false ;
            
        },
        setShowItemShoppingLayout : (state)=>{
            state.showItemShoppingLayout = true ;
            console.log('oke')
            
        },
        hideShowItemShoppingLayout : (state)=>{
            state.showItemShoppingLayout = false ;
            console.log(' no oke')
            
        }
    }
})
export const  uiAction = uislice.actions;
export default uislice