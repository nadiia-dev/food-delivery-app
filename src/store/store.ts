import { configureStore } from "@reduxjs/toolkit";
import userProgressReducer from "./userProgressSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    userProgress: userProgressReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
