import { configureStore,createSlice } from "@reduxjs/toolkit";

const initialState={
    score:0,
}

const quizSlice=createSlice({
    name:"quiz",
    initialState,
    reducers:{
        incrementScore:(state)=>{
            state.score+=1
        },
        resetScore:(state)=>{
             state.score=0
        }
        }

})

export const {incrementScore,resetScore}=quizSlice.actions;


const store=configureStore({
    reducer:{
        quiz:quizSlice.reducer,
    }
})

export default store