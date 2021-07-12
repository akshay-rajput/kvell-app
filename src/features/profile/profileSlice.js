import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUrl } from '@/utils/api.config';

export const getUserData = createAsyncThunk("profile/getUserData", async({userId, calledBy}) => {
    try{
        // console.count('called GetUserData - ');
        // console.log('called by: ', calledBy);
        const response = await axios.get(getUrl("getUser", {userId}));
        console.log('response of getUser: ', response);
        return response.data.user;
    }
    catch(error){
        console.log('error during getUser: ', error.message);
        // dispatch(logError(error))
        rejectWithValue(null);
        // Promise.reject("Error occured during getUser");
    }
})

export const saveUserData = createAsyncThunk("profile/saveUserData", async({userId, userData}) => {
    try{
        const response = await axios.post(getUrl("updateUser", {userId}), userData);
        console.log('save response: ', response);
        return response.data.user;
    }
    catch(error){
        console.log('Error saving profile: ', error);
        rejectWithValue(null);
    }
})

export const updateProfileAvatar = createAsyncThunk("profile/updateProfileAvatar", async(formData)=> {
    try{
        const response = await axios.post(getUrl("fileUpload", {}), formData);
        
        return response.data.imageUrl;
    }
    catch(error){
        console.log('error uploading picture - ', error);
        rejectWithValue(null);
    }
})

export const getUserPosts = createAsyncThunk("profile/getUserPosts", async(userId) => {
    try{
        // const response = await axios.get(getUrl("getAllPosts", {}));
        const response = await axios.get(getUrl("getHomeFeed", {}), {
            headers: {
                userid: userId
            }
        });
        // console.log('response -- userPosts: ', response.data);
        return response.data.posts;
        // let userPosts = response.data.posts.filter(post => post.publisher === userId);
        // return userPosts;
    }
    catch(error){
        console.log('error during getUserPosts: ', error);
        // dispatch(logError(error))
        rejectWithValue(null);
        // Promise.reject("Error occured during getUser");
    }
})

const initialProfile = {
    userData: {},
    badges: [],
    userPosts: [],
    status: 'Idle' 
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState : initialProfile,
    reducers: {
        resetProfile: state => initialProfile,
        addPostToProfile: (state, action) => {
            // console.log('add to profile: ', action.payload);
            state.userPosts.unshift(action.payload);
        }
    },
    extraReducers:{
        [getUserData.pending] : (state, action) => {
            state.status = "Loading"
        },
        [getUserData.fulfilled] : (state, action) => {
            // console.log('inside fulfilled..');
            state.userData = action.payload;
            state.status = "Fulfilled";
        },
        [getUserData.rejected] : (state, action) => {
            state.status = "Rejected"
        },

        // update user
        [saveUserData.fulfilled] : (state, action) => {
            // console.log('inside fulfilled..');
            state.userData = action.payload;
            state.status = "Fulfilled";
        },
        [saveUserData.rejected] : (state, action) => {
            state.status = "Rejected"
        },

        // update profile avatar
        [updateProfileAvatar.fulfilled] : (state, action) => {
            // avatar is updated when update profile is dispatched
            // state.userData.avatarUrl = action.payload;
            state.status = "Fulfilled";
        },
        [updateProfileAvatar.rejected] : (state, action) => {
            state.status = "Rejected"
        },

        // get posts for profile
        [getUserPosts.pending] : (state, action) => {
            state.status = "Loading"
        },
        [getUserPosts.fulfilled] : (state, action) => {
            // console.log('inside fulfilled.. -- ', action.payload);
            state.userPosts = action.payload;
            state.status = "Fulfilled";
        },
        [getUserPosts.rejected] : (state, action) => {
            state.status = "Rejected"
        },
    }
})

export const { resetProfile, addPostToProfile } = profileSlice.actions;

export default profileSlice.reducer;