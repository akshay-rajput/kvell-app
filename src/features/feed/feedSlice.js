import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { getUrl } from "../../utils/api.config";

// thunks
export const getUserFeed = createAsyncThunk("feed/getUserFeed", async(userId, {dispatch}) => {
    // console.log('getting userFeed:', userId);
    try{
        const response = await axios.get(getUrl("getHomeFeed", {}), {
            headers: {
                showHomeFeed: true,
                userid: userId
            }
        });
        console.log('response of getFeed: ', response);

        let userFeedPostIds = [];
        if(response.data.posts.length > 0){
            userFeedPostIds = response.data.posts.map(post => {
                return post._id;
            })
        }

        // get general feed if user feed is less than 10 posts
        if(response.data.posts.length > 0 && response.data.posts.length < 10){
            // get community posts
            await dispatch(getGeneralFeed(userFeedPostIds));
        }

        return response.data.posts;
    }
    catch(error){
        console.log('error during getUSerFeed - ', error.message);
        rejectWithValue(null);
    }
})

// general feed
export const getGeneralFeed = createAsyncThunk("feed/getGeneralFeed", async(userFeedPostIds, {getState}) => {
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
        console.log('others: ', otherFeed);
        return otherFeed;
    }
    catch(error){
        console.log('error during GenFeed - ', error.message);
        rejectWithValue(null);
    }
})

// slice
const initialFeed = {
    userFeed: [],
    generalFeed: [],
    userFeedStatus: 'Idle',
    generalFeedStatus: 'Idle',
};

const feedSlice = createSlice({
    name: "feed",
    initialState: initialFeed,
    reducers: {
        resetFeed: state => initialFeed,
        addPostToFeed: (state, action) => {
            // console.log('add to feed: ', action.payload);
            state.userFeed.unshift(action.payload);
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
            state.userFeedStatus = "Rejected";
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
    }
});

export const { resetFeed, addPostToFeed, updatePostInFeed } = feedSlice.actions;

export default feedSlice.reducer;