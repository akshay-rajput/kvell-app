import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { getUrl } from "../../utils/api.config";

// thunks
export const createPost = createAsyncThunk("feed/createPost", async({postData, image}, {dispatch, getState}) => {
    try{
        console.log('check image: '+image);

        if(image){
            const formData = new FormData();
            // Update the formData object
            formData.append(
                "image",
                image
            );
        
            const uploadImageAction = await dispatch(uploadImage(formData));
        
            let post_image = {
                imageUrl: uploadImageAction.payload,
                altText: ""
            }
            postData.images.push(post_image);    
        }
        
        // console.log('postData: ', postData);
        const response = await axios.post(getUrl("addPost", {}), postData);
        console.log('response of createPost: ', response);

        let createdPostData = response.data.post

        let {authentication} = getState();
        let publisher = {
            avatarUrl: authentication.userAvatar,
            _id: authentication.userId,
            name: authentication.name,
            username: authentication.username
        }
        // console.log('publisher: ', publisher);
        createdPostData.publisher = publisher;

        console.log('created Post: ', createdPostData);
        return createdPostData;
    }
    catch(error){
        console.log('error during create Post - ', error.message);
        rejectWithValue(null);
    }
})

// upload image
export const uploadImage = createAsyncThunk("post/uploadImage", async(formData)=> {
    try{
        const response = await axios.post(getUrl("fileUpload", {}), formData);
        // console.log('image upload: ', response.data);
        return response.data.imageUrl;
    }
    catch(error){
        console.log('error uploading picture - ', error);
        rejectWithValue(null);
    }
})

// addLike

// addComment

// slice
const initialPostData = {
    post: {},
    status: 'Idle',
};

const postSlice = createSlice({
    name: "post",
    initialState: initialPostData,
    reducers: {
        resetPost: state => initialPostData
    },
    extraReducers: {
        [createPost.pending] : (state, action) => {
            state.status = "Loading";
        },
        [createPost.fulfilled] : (state, action) => {
            // state.userFeed = action.payload;
            state.status = "Fulfilled";
        },
        [createPost.rejected] : (state, action) => {
            state.status = "Rejected";
        },

        [uploadImage.pending] : (state, action) => {
            state.status = "Loading";
        },
        // [uploadImage.fulfilled] : (state, action) => {
        //     state.userFeed = action.payload;
        //     state.status = "Fulfilled";
        // },
        [uploadImage.rejected] : (state, action) => {
            state.status = "Rejected";
        },

    }
});

export const { resetFeed } = postSlice.actions;

export default postSlice.reducer;