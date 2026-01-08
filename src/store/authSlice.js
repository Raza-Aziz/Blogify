import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // user initially is not authenticated
  userData: null, // no initial user data
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      // no need of action here
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

// export default authSlice;
export default authSlice.reducer;
