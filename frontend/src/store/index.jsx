import { configureStore } from "@reduxjs/toolkit";
import hemsReducer from "./modules/hemsSlice";
 

export const store = configureStore({
    reducer: {
        hemsR : hemsReducer, 
    }
})