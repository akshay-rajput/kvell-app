import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { getUrl } from "@/utils/api.config";

export const getNotificationsForUser = createAsyncThunk("post/getNotifications", async (userId) => {
    try{
        const response = await axios.get(getUrl("getNotifications", {}), {
            headers: {
                userid: userId
            }
        });
        console.log('fetched notifications: ', response.data);
        return response.data.notifications;
    }
    catch(err){
        console.log("Error getting notifications: ", err.message);
        rejectWithValue(null);
    }    
})

export const createNewNotification = createAsyncThunk("post/createNewNotification", async (notificationData) => {
    try{
        const response = await axios.post(getUrl("createNotification", {}), notificationData);
        console.log('created notification: ', response.data);
    }
    catch(err){
        console.log("Error creating notification: ", err.message);
        rejectWithValue(null);
    }
})

export const updateAllNotifications = createAsyncThunk("post/updateAllNotifications", async (userId) => {
    try{
        const response = await axios.post(getUrl("markNotificationsRead", {}), {}, {
            headers: {
                userid: userId,
                markallread: true
            }
        });
        console.log('markedAll notifications: ', response.data);
    }
    catch(err){
        console.log("Error updating notifications: ", err.message);
        rejectWithValue(null);
    }    
})

// slice
const initialNotifications = {
    userNotifications: [],
    unreadNotifications: 0,
    status: 'Idle',
    statusOfNotificationUpdate: "Idle"
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState: initialNotifications,
    reducers: {
        resetNotification: state => initialNotifications,
        // updatePostInSlice: (state, action) => {
        //     // if in userfeed update the post
        //     state.post = action.payload;
        // }
    },
    extraReducers: {
        
        [getNotificationsForUser.pending] : (state, action) => {
            state.status = "Loading";
        },
        [getNotificationsForUser.fulfilled] : (state, action) => {
            // find unread
            let unread = action.payload.filter(notification => notification.markedAsRead === "false" || notification.markedAsRead === false);
            state.unreadNotifications = unread.length;

            // reverse to get latest
            let orderedNotifications = action.payload.reverse();
            state.userNotifications = orderedNotifications;
            state.status = "Fulfilled";
            console.log("notifs.. ", state.userNotifications);
        },
        [getNotificationsForUser.rejected] : (state, action) => {
            state.status = "Rejected";
        },

        // mark all as read
        [updateAllNotifications.pending] : (state, action) => {
            state.statusOfNotificationUpdate = "Loading";
        },
        [updateAllNotifications.fulfilled] : (state, action) => {
            let allUpdatedNotifications = [...state.userNotifications];
            
            allUpdatedNotifications.forEach(notification=> {
                notification.markedAsRead = true;
            })
            
            state.userNotifications = allUpdatedNotifications;
            state.statusOfNotificationUpdate = "Fulfilled";
        },
        [updateAllNotifications.rejected] : (state, action) => {
            state.statusOfNotificationUpdate = "Rejected";
        },

    }
});


export const { resetNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;