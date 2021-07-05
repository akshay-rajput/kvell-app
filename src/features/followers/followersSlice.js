import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUrl } from '@/utils/api.config';

export const getUserFollowerData = createAsyncThunk("followers/getUserFollowerData", async(userId) => {
    try{
        const response = await axios.get(getUrl("getFollow", {}), {
            headers: {
                userid: userId
            }
        });
        console.log('response of getFollow: ', response);

        let followData = {
            followers: response.data.followers,
            following: response.data.following
        }
        return followData;
    }
    catch(error){
        console.log('error during getFollow - ', error.message);
        // dispatch(logError(error))
        rejectWithValue(null);
        // Promise.reject("Error occured during getUser");
    }
})

// follow a user
export const followUser = createAsyncThunk("followers/followUser", async({userId, followUserId}) => {
    console.log("myId: "+userId+' === follow: ', followUserId);
    
    try{
        const response = await axios.request ({
            url: getUrl("updateFollow", {followUserId}),
            method: 'post',
            headers: {
                'userid': userId
            }
        });

        console.log('response of follow: ', response);
        return response.data;
    }
    catch(error){
        console.log('error following: ', error);
        rejectWithValue(null);
    }
});

// unfollow a user
export const unfollowUser = createAsyncThunk("followers/unfollowUser", async({userId, followUserId}) => {
    // console.log("myId: "+userId+' === unfollow: ', followUserId);

    try{
        const response = await axios.request ({
            url: getUrl("updateFollow", {followUserId}),
            method: 'delete',
            headers: {
                'userid': userId
            }
        });
        console.log('response of unfollow: ', response);
        
        return {userId, followUserId};
    }
    catch(error){
        console.log('error unfollowing..', error);
        rejectWithValue(null);
    }
    
});

const initialFollowerData = {
    followers: [],
    following: [],
    status: 'Idle' 
}

export const followersSlice = createSlice({
    name: 'followers',
    initialState : initialFollowerData,
    reducers: {
        resetFollowerData: state => initialFollowerData
    },
    extraReducers:{
        [getUserFollowerData.pending] : (state, action) => {
            state.status = "Loading"
        },
        [getUserFollowerData.fulfilled] : (state, action) => {
            // console.log("current state - ", current(state) );
            state.followers = action.payload.followers;
            state.following = action.payload.following;
            state.status = "Fulfilled";
        },
        [getUserFollowerData.rejected] : (state, action) => {
            state.status = "Rejected"
        },

        // follow
        [followUser.pending] : (state, action) => {
            state.status = "Loading"
        },
        [followUser.fulfilled] : (state, action) => {
            // console.log("current state - ", current(state) );
            state.followers = action.payload.followers;
            state.following = action.payload.following;
            // state.followers = action.payload.followers;
            state.status = "Fulfilled";
        },
        [followUser.rejected] : (state, action) => {
            state.status = "Rejected"
        },

        // unfollow
        [unfollowUser.pending] : (state, action) => {
            state.status = "Loading"
        },
        [unfollowUser.fulfilled] : (state, action) => {
            // console.log("current state - ", current(state) );
            const {userId, followUserId} = action.payload;
            let newFollowerList = state.followers.filter((follower) => follower.userId._id !== userId);
            console.log('newFOllowers: ', newFollowerList.length);

            state.followers = newFollowerList;
            state.status = "Fulfilled";
        },
        [unfollowUser.rejected] : (state, action) => {
            state.status = "Rejected"
        },

    }
})

export const { resetFollowerData } = followersSlice.actions;

export default followersSlice.reducer;