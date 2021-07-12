import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {addPostToFeed} from '@/features/feed/feedSlice';
import {addPostToProfile} from '@/features/profile/profileSlice';
import { createPost } from './postSlice';

import { useSelector, useDispatch } from 'react-redux';
import {MdPhoto} from "react-icons/md"; 
import {ImSpinner8} from "react-icons/im"; 
import { Button } from '@material-ui/core';

const AddPostDiv = styled.div`
    border: 1px solid var(--primary-light);
    border-radius: var(--border-radius);
    background: var(--card-bg);
    display:flex;
    flex-direction: column;
    padding: 1rem;
    textarea{
        width: 100%;
    }

    .post-btn-upload{
        cursor: pointer;
        color: var(--primary);
        transition: color ease 0.35s;
        &:hover{
            color: var(--primary-dark);
        }
    }
`;

export default function AddPost() {
    useEffect(() => {
        console.log('mounted add post..');
    }, []);

    const initialPostState = {
        postContent: "",
        postImage: {},
        postHashTags: [],
        creatingPost: false
    }

    const [postState, setPostState] = useState(initialPostState);
    const authState = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    const {status} = useSelector(state => state.post);

    async function createNewPost(event){
        event.preventDefault();
        // console.log('creating..');

        let postData = {
            publisher: authState.userId,
            content: postState.postContent,
            images: [],
            likes: [],
            comments: [],
            hashtags: []
        }

        let createdPost = {}
        try{
            if(postState.postImage.name){
                createdPost = await dispatch(createPost({postData, image: postState.postImage}));
            }
            else{
                createdPost = await dispatch(createPost({postData, image: null}));
            }

            // add createdpost to userfeed and profile timeline
            dispatch(addPostToFeed(createdPost.payload));
            dispatch(addPostToProfile(createdPost.payload));

            // reset post input
            setPostState(initialPostState);
        }
        catch(error){
            console.log('Error creating post: ', error);
            // setPostState(initialPostState);
        }

    }

    function imageUpload(event){
        if(event.target.files?.length > 0){
            
            let imageData = event.target.files[0];
            setPostState(prevState => ({
                ...prevState,
                postImage: imageData
            }))
            // console.log('file: ',imageData);
        }
    }

    function handleInputChange(event){
        setPostState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value 
        }))
    }

    return (
        <AddPostDiv className="mb-8">
            <form onSubmit={createNewPost}>
                <textarea name="postContent" onChange={handleInputChange} value={postState.postContent} id="post_content" placeholder="What's on your mind?" rows="3" required></textarea>
                {/* <input type="text" className="post-hash-tags" name="postHashtags" placeholder="Add hashtags (separated by commas)"  className="w-full"/> */}

                <div className="flex justify-between items-center mt-4">
                    <label className="post-btn-upload flex items-center" >
                        <MdPhoto className="text-3xl" title={"Upload Image"} />
                        <input type="file" name="postImage" id="post-image" className="hidden" onChange={imageUpload} />
                        <small className="text-gray-400 text-xs">{postState.postImage.name?.length > 20 ? postState.postImage.name.substring(0,20)+"...": postState.postImage.name}</small>
                    </label>
                    <Button type="submit" disabled={status === "Loading"} variant="contained" className="btn-primary">
                        {
                            status === "Loading" ? 
                            <span className="flex items-center">
                                <ImSpinner8 className="loading-icon mr-2"/>
                                Add Post
                            </span>
                            :
                            "Add Post"
                        }
                    </Button>
                </div>
            </form>

        </AddPostDiv>
    )
}
