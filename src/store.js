/*
    state = {
        posts = [{
            url, title, image, time, OP, subreddit, icon of subreddit,  comment count, time, upvotes  
            Get it with a fetch call and filter all the useless stuff
        }];
        currentPost = [{
            url, title, image, OP, subreddit, icon of subreddit, comment count, time, upvotes, comments  
        }];
        sideInformation = {
            Links to other subreddits, see later.
        };
        currentSearch = '' 
    }

    actions = {
        Log In.
        Log Out.
        upvote: do a call to upvote on the current Post. Only if logged in.
        DownVote: do a call  to downVote on the current post, only if logged in.
        Comment: comment on the current post, only if logged in and the current post is selected.
        Choose othe subreddit: Via search or links, get the subreddit and fetch posts.
        Search: match all the subredits and give links. 
    }
*/

import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "./features/posts/postsSlice";
import currentPostReducer from "./features/posts/currentPost/currentPostSlice";
import userSliceReducer from "./features/users/userSlice";

export default configureStore({
    reducer: {
        posts: postsSliceReducer,
        currentPost: currentPostReducer,
        userSlice: userSliceReducer
    }
})