import { createSlice } from "@reduxjs/toolkit";
const gamesSlice = createSlice({
    name : 'tenGames', 
    initialState:{
       games : []
    },
    reducers:{
        setGames : (state,actions)=>{
            state.games = actions.payload
        }
    }

})
export const gameAction = gamesSlice.actions
export default gamesSlice