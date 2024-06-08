import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    show: false,
  },
  reducers: {
    toggleState: (state) => {
      state.show = !state.show;
    },
  },
});

export const { toggleState } = generalSlice.actions;

export default generalSlice.reducer;
