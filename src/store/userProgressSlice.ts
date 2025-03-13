import { createSlice } from "@reduxjs/toolkit";

interface UserProgressState {
  progress: string;
}

const initialState: UserProgressState = {
  progress: "",
};

const userProgressSlice = createSlice({
  name: "userProgress",
  initialState,
  reducers: {
    showCart: (state) => {
      state.progress = "cart";
    },
    closeCart: (state) => {
      state.progress = "";
    },
    showCheckout: (state) => {
      state.progress = "checkout";
    },
    closeCheckout: (state) => {
      state.progress = "";
    },
  },
});

export const { showCart, closeCart, showCheckout, closeCheckout } =
  userProgressSlice.actions;

export default userProgressSlice.reducer;
