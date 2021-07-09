import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from '@/features/authentication/authenticationSlice';
// import postReducer from "@/features/posts/postSlice";
// import notificationReducer from "@/features/posts/notificationSlice";
import profileReducer from "@/features/profile/profileSlice";
import followerReducer from "@/features/followers/followersSlice";
import feedReducer from "@/features/feed/feedSlice";

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        // posts: postReducer,
        feed: feedReducer,
        profile: profileReducer,
        follow: followerReducer,
        // notifications: notificationReducer,
    }
})