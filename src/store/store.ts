import { configureStore } from "@reduxjs/toolkit";
import userProgressReducer from "./userProgressSlice";

const store = configureStore({
  reducer: {
    userProgress: userProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
