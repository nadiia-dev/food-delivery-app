import { configureStore } from "@reduxjs/toolkit";
import userProgressReducer from "./userProgressSlice";
import cartReducer from "./cartSlice";
import { PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

interface Items {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: Items[];
}

const persistConfig: PersistConfig<CartState> = {
  key: "cart",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    userProgress: userProgressReducer,
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
