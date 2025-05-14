import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banner: "",
  title: "",
  content: "",
  description: "",
  tags: [],
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    updateDraft: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearDraft: () => ({
      banner: "",
      title: "",
      content: "",
      description: "",
      tags: [],
    }),
  },
});

export const { updateDraft, clearDraft } = draftSlice.actions;
export default draftSlice.reducer;
