import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubredditPosts } from "../../API/API";

export const updateCurrentPosts = createAsyncThunk(
  "posts/updateCurrentPosts",
  async (url, thunkAPI) => {
    const response = await getSubredditPosts(url);
    return response;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    currentPosts: [],
    status: "idling",
    isLoading: false,
    hasError: false,
  },
  reducers: {
    cleanCurrentPosts: (state) => {
      state.currentPosts = [];
    }
  },
  extraReducers: {
    [updateCurrentPosts.pending]: (state, action) => {
      state.status = "loading";
      state.isLoading = true;
      state.hasError = false;
    },
    [updateCurrentPosts.fulfilled]: (state, action) => {
      state.currentPosts = action.payload;
      state.status = "fulfilled";
      state.isLoading = false;
      state.hasError = false;
    },
    [updateCurrentPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = "rejected";
      state.hasError = true;
      console.log(action);
    },
  },
});
export default postsSlice.reducer;
