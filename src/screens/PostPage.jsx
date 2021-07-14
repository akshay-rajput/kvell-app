import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PostCard from '@/features/posts/PostCard';
import PostComments from '../features/posts/PostComments';
import Avatar from '@/features/_shared_/UserAvatar';
import ErrorState from "@/features/_shared_/ErrorState";
import {getPost} from '@/features/posts/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '@/features/posts/PostSlice';
import { updatePostInFeed } from '@/features/feed/feedSlice';
import { updatePostInProfile } from '@/features/profile/profileSlice';

import styled from "styled-components";
import {MdKeyboardArrowLeft} from 'react-icons/md';
import {ImSpinner8} from 'react-icons/im';

const PostDetailPage = styled.div`
    .btn-back{
        color: var(--primary-dark);
        transition: color ease 0.35s;
    
        :hover{
            color: var(--dark);
        }
    }
`;

const PostComment = styled.div`
    border-radius: var(--border-radius);
    border: 1px solid var(--primary-light);
    background: var(--card-bg);
    padding: 0.1rem;

    input.comment-input{
        font-size: 0.75rem;
        border-color: var(--light);
        border-radius: var(--border-radius);
        &:focus{
            outline: 1px solid var(--light);
        }
    }
    button{
        color: var(--primary-dark);
        background: var(--primary-light);
        padding: 0.5rem;
        border-radius: var(--border-radius);
    }
`;

export default function PostPage() {
    let {post, status} = useSelector(state => state.post);
    let authState = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    const {postId} = useParams();
    const navigate = useNavigate();

    const [comment, setComment] = useState("");
    const [isCommentBeingAdded, setIsCommentBeingAdded] = useState(false);

    useEffect(() => {
        // fetch post data
        (async() => {

            if(post._id !== postId){
                // console.log('fetching post data.');
                await dispatch(getPost(postId));
            }
        })();

    }, []);

    async function addComment(event){
        event.preventDefault();
        setIsCommentBeingAdded(true);

        let clonedPost = JSON.parse(JSON.stringify(post));

        let commentToBeAdded = {
            commentText: comment,
            commentByUser: authState.userId
        }

        try{
            clonedPost.comments.push(commentToBeAdded);

            console.log('comment add: ', clonedPost);

            // update in db
            await dispatch(updatePost({
                updatedPost: clonedPost,
                postId: clonedPost._id
            }));

            setIsCommentBeingAdded(false);
            setComment("");
            
            // update local state
            await dispatch(updatePostInFeed(clonedPost));
            await dispatch(updatePostInProfile(clonedPost));
        }
        catch(error){
            console.log('error adding comment: ', error.message);
            setIsCommentBeingAdded(false);
        }
    }

    function onCommentChange(event){
        setComment(event.target.value);
    }

    return (
        <PostDetailPage className="w-full">
            <div className="">
                <button className="btn-back flex items-center" onClick={()=> navigate(-1)}>
                    <MdKeyboardArrowLeft /> Back
                </button>
                
                <div className="mt-4 mb-8">
                    {
                        status == "Loading" ?
                        <div className="flex items-center justify-center h-24">
                            <ImSpinner8 className="loading-icon text-2xl text-purple-600" />
                        </div>
                        :
                        status == "Rejected" ?
                        <ErrorState />
                        :
                        <div className="post-container">
                            {
                                (post._id === postId) &&
                                <PostCard post={post}/>
                            }
                            {
                                post.comments?.length > 0 ?
                                <PostComments allComments={post.comments}/>
                                :
                                null
                            }

                            <PostComment className="add-comment flex items-center">
                                <Avatar avatarSize={"small"} avatarUrl={authState.userAvatar} />
                                <form onSubmit={addComment} className="flex flex-grow">
                                    <input type="text" onChange={onCommentChange} value={comment} 
                                            name="commentText" id="commentText" placeholder={"Comment as "+authState.name} 
                                            className="comment-input flex-grow" required/>
                                    <button className="text-xs ml-1" disabled={isCommentBeingAdded}>
                                    {
                                        isCommentBeingAdded ? 
                                        <ImSpinner8 className="loading-icon text-purple-700" />
                                        :
                                        "Send"
                                    }
                                    </button>
                                </form>
                            </PostComment>
                        </div>
                        
                    }
                    
                </div>
            </div>
        </PostDetailPage>
    )
}
