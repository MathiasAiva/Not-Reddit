/*
    state = {
        posts = [{
            Get it with a fetch call and filter all the useless data
            It's an array full of posts
        }];
        currentPost = {
            Single post with an array of comments and replies
        };
    }
*/

import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "./features/posts/postsSlice";
import currentPostReducer from "./features/currentPost/currentPostSlice";

export default configureStore({
  reducer: {
    posts: postsSliceReducer,
    currentPost: currentPostReducer,
  },
});
