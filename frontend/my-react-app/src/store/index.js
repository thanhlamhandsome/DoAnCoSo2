

import gamesSlice from "./loadTenGame";
import { configureStore } from "@reduxjs/toolkit";
import uislice from "./ui-slice";
import cartSlice from "./cart-slice";
const store = configureStore({
    reducer:{tenGames:gamesSlice.reducer,ui:uislice.reducer,cart:cartSlice.reducer}
})
export default store