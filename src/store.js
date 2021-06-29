import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from '@/features/authentication/authenticationSlice';
// import postReducer from "@/features/posts/postSlice";
// import notificationReducer from "@/features/posts/notificationSlice";
// import profileReducer from "@/features/posts/profileSlice";
// import feedReducer from "@/features/posts/feedSlice";

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        // posts: postReducer,
        // feeds: feedReducer,
        // profiles: profileReducer,
        // notifications: notificationReducer,
    }
})