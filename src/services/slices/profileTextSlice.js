import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: "",
};

const profileTextSlice = createSlice({
  name: "profileText",
  initialState,
  reducers: {
    setInfoText: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setInfoText } = profileTextSlice.actions;

export default profileTextSlice.reducer;
