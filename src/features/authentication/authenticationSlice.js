import { createSlice } from '@reduxjs/toolkit';

const localToken = JSON.parse(localStorage.getItem('token'));
const localName = JSON.parse(localStorage.getItem('name'));
const localUserId = JSON.parse(localStorage.getItem('userId'));
const localUsername = JSON.parse(localStorage.getItem('username'));
const localAvatar = JSON.parse(localStorage.getItem('userAvatar'));

const userInfo = {
    userId: localUserId ? localUserId : "",
    name: localName ? localName: "",
    username: localUsername ? localUsername : "",
    token: localToken ? localToken : null,
    userAvatar: localAvatar ? localAvatar : ""
}
console.log('userInfo: ', userInfo);

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState : userInfo,
    reducers: {
        LOGIN: (state, action) => {
            console.log('actionPassed: ', action);
            state.userId = action.payload.id;
            state.name = action.payload.name;
            state.username = action.payload.name;
            state.token = action.payload.token;
            state.userAvatar = action.payload.avatarUrl;
        },
        LOGOUT: state => {
            console.log('logoutAction..')
            localStorage.setItem('userId', null);
            localStorage.setItem('name', null);
            localStorage.setItem('username', null);
            localStorage.setItem('token', null);
            localStorage.setItem('userAvatar', null);

            // reset
            state.userId = "";
            state.name = "";
            state.username = "";
            state.token = null;
            state.userAvatar = "";
        },
    }
})

export const { LOGIN, LOGOUT } = authenticationSlice.actions;

export default authenticationSlice.reducer;