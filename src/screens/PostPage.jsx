import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PostCard from '@/features/posts/PostCard';
import PostComments from '../features/posts/PostComments';
import Avatar from '@/features/_shared_/UserAvatar';
import ErrorState from "@/features/_shared_/ErrorState";
import {getPost} from '@/features/posts/postSlice';
import TopContributors from '@/features/feed/TopContributors';
import useWindowDimensions from "@/hooks/useWindowDimensions";

import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '@/features/posts/postSlice';
import { updatePostInFeed } from '@/features/feed/feedSlice';
import { updatePostInProfile } from '@/features/profile/profileSlice';
import { createNewNotification } from '@/features/notifications/notificationSlice';

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
    z-index: 1;

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

    &::before{
        content: '';
        position: absolute;
        right: 0;
        z-index: 1;
        top: -1rem;
        height: 1rem;
        width: 100%;
        // background: black;
        background: linear-gradient(180deg, rgba(194,224,255,0) 0%, var(--light) 51%);}
`;

export default function PostPage() {
    let {post, status} = useSelector(state => state.post);
    let authState = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    const {postId} = useParams();
    const navigate = useNavigate();
    const {width, height} = useWindowDimensions();

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

            // send notification if not commenting on own post
            // console.log("checking to send notif: ", clonedPost.publisher._id +' -- auth: ', authState.userId);
            if(authState.userId !== clonedPost.publisher._id){
                let notificationData = {
                    postId: clonedPost._id,
                    notificationType: "Comment",
                    markedAsRead: false,
                    notificationTo: clonedPost.publisher._id,
                    notificationFrom: authState.userId
                }

                await dispatch(createNewNotification(notificationData));
            }

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
            <div className="grid grid-cols-5 gap-x-4 lg:gap-x-8 w-full mb-4">
                <div className="col-span-5 md:col-span-3">
                    <button className="btn-back flex items-center" onClick={()=> navigate(-1)}>
                        <MdKeyboardArrowLeft /> Back
                    </button>
                </div>
                
                <div className="col-span-5 md:col-span-3 mt-4 mb-8">
                    {
                        status == "Loading" ?
                        <div className="flex items-center justify-center h-24">
                            <ImSpinner8 className="loading-icon text-2xl text-purple-600" />
                        </div>
                        :
                        status == "Rejected" ?
                        <ErrorState />
                        :
                        <div className="post-container relative">
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

                            <PostComment className="add-comment relative flex items-center">
                                <Avatar avatarSize={"small"} avatarUrl={authState.userAvatar} />
                                <form onSubmit={addComment} className="flex flex-grow bg-white">
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

                <div className="col-span-5 md:col-span-2 mt-4">
                    {
                        width >= 768 ?
                        <TopContributors /> : null
                    }
                </div>
            </div>
        </PostDetailPage>
    )
}
