import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.userData = action.payload;
    },
    setlogoutUser: (state) => {
      state.userData = {};
    },
  },
});

export const { setLoggedInUser, setlogoutUser } = authSlice.actions;
export const getUserAuthData = (state) => state.auth.userData;

export default authSlice.reducer;
