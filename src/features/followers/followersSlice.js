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

    }
})

export const { resetFollowerData } = followersSlice.actions;

export default followersSlice.reducer;