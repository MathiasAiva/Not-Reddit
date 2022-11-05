import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPost, getComments, getSubreddit } from "../../../API/API";

export const updateCurrentPostData = createAsyncThunk(
  "currentPost/updateCurrentPostData",
  async (arr, thunkAPI) => {
    const p = await getPost(arr);
    const c = await getComments(arr);
    const response = { post: p, comments: c };
    return response;
  }
);

export const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: {
    currentPostData: [],
    status: "idling",
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    [updateCurrentPostData.pending]: (state, action) => {
      state.status = "loading";
      state.isLoading = true;
      state.hasError = false;
    },
    [updateCurrentPostData.fulfilled]: (state, action) => {
      state.currentPostData = action.payload;
      state.status = "fulfilled";
      state.isLoading = false;
      state.hasError = false;
    },
    [updateCurrentPostData.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = "rejected";
      state.hasError = true;
      console.log(action);
    },
  },
});
export default currentPostSlice.reducer;
