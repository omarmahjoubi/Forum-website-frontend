import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from './slices/sessionSlice';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,sessionReducer)

 const store = configureStore({
    reducer : {
        session : persistedReducer
    }
})



export default store