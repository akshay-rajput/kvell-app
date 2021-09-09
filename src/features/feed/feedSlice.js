import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { getUrl } from "../../utils/api.config";

// thunks
export const getUserFeed = createAsyncThunk("feed/getUserFeed", async(userId, {dispatch, rejectWithValue}) => {
    try{
        const response = await axios.get(getUrl("getHomeFeed", {}), {
            headers: {
                showHomeFeed: true,
                userid: userId
            }
        });

        let userFeedPostIds = [];
        if(response.data.posts.length > 0){
            userFeedPostIds = response.data.posts.map(post => {
                return post._id;
            })
        }

        // get general feed if user feed is less than 10 posts
        if(response.data.posts.length >= 0 && response.data.posts.length < 10){
            // get community posts
            await dispatch(getGeneralFeed(userFeedPostIds));
        }
        // console.log("fulfilled feed: ", response.status);
        return response.data.posts;
    }
    catch(error){
        console.log('error during getUSerFeed - ', error.message);
        let code = error.response.status;
        return rejectWithValue(code);
    }
})

// general feed
export const getGeneralFeed = createAsyncThunk("feed/getGeneralFeed", async(userFeedPostIds) => {
    try{
        const response = await axios.get( getUrl("getAllPosts", {}) );
        // console.log('response of GenFeed: ', response);

        const allPosts = response.data.posts;
        let otherFeed = allPosts;

        if(userFeedPostIds && userFeedPostIds.length > 0){
            otherFeed = allPosts.filter(post => {
                return !userFeedPostIds.includes(post._id);
            })
        }
        // console.log('others: ', otherFeed);
        return otherFeed;
    }
    catch(error){
        console.log('error during GenFeed - ', error.message);
        rejectWithValue(null);
    }
})

// get all users and find Top contributors
export const getTopUsers = createAsyncThunk("feed/getTopUsers", async(_, {rejectWithValue}) => {
    try{
        const response = await axios.get( getUrl("getTopUsers", {}) );
        // console.log("top users: ", response.data.topUsers);
        return response.data.topUsers;
    }
    catch(error){
        console.log('error getting users: ', error.message);
        return rejectWithValue(error.response.status);
    }
})

// slice
const initialFeed = {
    userFeed: [],
    generalFeed: [],
    topContributors: [],
    userFeedStatus: 'Idle',
    generalFeedStatus: 'Idle',
    topContributorStatus: "Idle"
};

const feedSlice = createSlice({
    name: "feed",
    initialState: initialFeed,
    reducers: {
        resetFeed: (state, action) => {
            return {
                userFeed: [],
                generalFeed: [],
                topContributors: [],
                userFeedStatus: 'Idle',
                generalFeedStatus: 'Idle',
                topContributorStatus: "Idle"
            }
        },
        addPostToFeed: (state, action) => {
            // console.log('add to feed: ', action.payload);
            state.userFeed.unshift(action.payload);
        },
        removePostFromFeed: (state, action) => {
            let postId = action.payload;
            // console.log('post to update: ', post);

            // check in user feed
            let indexInUserFeed = state.userFeed.findIndex(element => element._id === postId);

            // if in userfeed update userfeed
            if(indexInUserFeed > -1){
                state.userFeed.splice(indexInUserFeed, 1);
            }
        },
        updatePostInFeed: (state, action) => {
            // find the post
            let post = action.payload;
            // console.log('post to update: ', post);

            // check in user feed
            let indexInUserFeed = state.userFeed.findIndex(element => element._id === post._id);

            // if in userfeed update the post
            if(indexInUserFeed > -1){
                state.userFeed[indexInUserFeed] = post;
            }
            else{
                let indexInGeneralFeed = state.generalFeed.findIndex(element => element._id === post._id);
                state.generalFeed[indexInGeneralFeed] = post;
            }
            // console.log('post in user Feed: ', indexInUserFeed);
        }
    },
    extraReducers: {
        [getUserFeed.pending] : (state, action) => {
            state.userFeedStatus = "Loading";
        },
        [getUserFeed.fulfilled] : (state, action) => {
            state.userFeed = action.payload;
            state.userFeedStatus = "Fulfilled";
        },
        [getUserFeed.rejected] : (state, action) => {
            // console.log("Rejection statusCode: ", action.payload);
            if(action.payload === 401){
                state.userFeedStatus = "Expired";
            }else{
                state.userFeedStatus = "Rejected";
            }
        },

        // general
        [getGeneralFeed.pending] : (state, action) => {
            state.generalFeedStatus = "Loading";
        },
        [getGeneralFeed.fulfilled] : (state, action) => {
            state.generalFeed = action.payload;
            state.generalFeedStatus = "Fulfilled";
        },
        [getGeneralFeed.rejected] : (state, action) => {
            state.generalFeedStatus = "Rejected";
        },
    
        // top contributors
        [getTopUsers.pending] : (state, action) => {
            state.topContributorStatus = "Loading";
        },
        [getTopUsers.fulfilled] : (state, action) => {
            state.topContributors = action.payload;
            state.topContributorStatus = "Fulfilled";
        },
        [getTopUsers.rejected] : (state, action) => {
            if(action.payload === 401){
                state.topContributorStatus = "Idle"
            }else{
                state.topContributorStatus = "Rejected";
            }
        },
    
    }
});

export const { resetFeed, addPostToFeed, removePostFromFeed, updatePostInFeed } = feedSlice.actions;

export default feedSlice.reducer;