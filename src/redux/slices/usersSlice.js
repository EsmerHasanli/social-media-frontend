import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    sign_in: (state, action) => {
      const { email, password } = action.payload;
      state.user.push({ email, password });
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    sign_out: (state, action) => {
      state.user[null];
      localStorage.removeItem("user");
    },
  },
});

export const { sign_in, sign_out } = usersSlice.actions;
export default usersSlice.reducer;
