import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProfileTextState {
  info: string;
}

const initialState: IProfileTextState = {
  info: "",
};

const profileTextSlice = createSlice({
  name: "profileText",
  initialState,
  reducers: {
    setInfoText: (state, action: PayloadAction<string>) => {
      state.info = action.payload;
    },
  },
});

export const { setInfoText } = profileTextSlice.actions;

export default profileTextSlice.reducer;
