import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Avatar from "@/features/_shared_/UserAvatar";
import {checkIfLiked} from '@/utils/checkIfLiked';
import { updatePost, updatePostInSlice, deletePost } from '@/features/posts/postSlice';
import { updatePostInFeed, removePostFromFeed } from '@/features/feed/feedSlice';
import { updatePostInProfile, removePostFromProfile } from '@/features/profile/profileSlice';

import {Link} from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';import { formatDistanceToNow } from 'date-fns'
import {FaRegComment, FaRegHeart, FaHeart, FaRegTrashAlt} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { createNewNotification } from '@/features/notifications/notificationSlice';

const PostCardDiv = styled.div`
    border: 1px solid var(--primary-light);
    background: var(--card-bg);
    border-radius: var(--border-radius);

    .post-content{
        // min-height: 4rem;
        
        .post-text{
            white-space: pre-wrap;
        }

        img{
            width: auto;
            max-width: 70%;
            border-radius: var(--border-radius);
        }
    }

    @media(max-width: 480px){
        .post-content img{
            max-width: 100%;
        }
    }
`;

export default function PostCard({post}) {
    const authState = useSelector((state) => state.authentication);
    const dispatch = useDispatch();

    let isThisPostLiked = checkIfLiked(post.likes, authState.userId);

    const [optimizedImage, setOptimizedImage] = useState("");

    useEffect(() => {
        if(post.images[0]?.imageUrl){
            let position = post.images[0].imageUrl.indexOf("upload") + 7;
            let dynamic_width = `w_auto,c_scale/q_auto/f_auto/`;
            let opt_img_url = post.images[0].imageUrl.substring(0, position) + dynamic_width + post.images[0].imageUrl.substring(position);

            setOptimizedImage(opt_img_url);
        }
    }, [post]);

    async function likePostClicked(){
        // console.log('liked..');

        let clonedPost = JSON.parse(JSON.stringify(post));

        try{
            // if already liked, unlike it
            if(isThisPostLiked){
                let updatedLikes = clonedPost.likes.filter(like => like.likedByUser._id !== authState.userId);
                // console.log("unlike: ", updatedLikes);
                clonedPost.likes = updatedLikes;
                // console.log('updatedLikes: ', clonedPost.likes);
            }
            else{
                let like = {
                    likedByUser: {
                        _id: authState.userId,
                        avatarUrl: authState.userAvatar,
                        name: authState.name,
                        username: authState.username
                    }
                }

                // console.log('likes: ', clonedPost.likes);
                clonedPost.likes.push(like);
            }

            // update local state
            await dispatch(updatePostInFeed(clonedPost));

            // update in db
            await dispatch(updatePost({
                updatedPost: clonedPost,
                postId: clonedPost._id
            }));
            
            await dispatch(updatePostInProfile(clonedPost));

            // send notification if liking someone else's post
            // console.log("checking to send notif: ", clonedPost.publisher._id +' -- auth: ', authState.userId);
            if((authState.userId !== clonedPost.publisher._id) && !isThisPostLiked){
                let notificationData = {
                    postId: clonedPost._id,
                    notificationType: "Like",
                    markedAsRead: false,
                    notificationTo: clonedPost.publisher._id,
                    notificationFrom: authState.userId
                }

                await dispatch(createNewNotification(notificationData));
            }
        }
        catch(error){
            console.log('error in postcard: ', error.message);
        }
    }

    async function removePost(){
        // console.log('delete: ', postId);
        let postId = post._id;

        let confirmDelete = confirm("Are you sure to delete this post?");
        // console.log({confirmDelete});

        // delete post from db
        if(confirmDelete){
            try{
                // update post in local state
                dispatch(removePostFromFeed(postId));

                let updatedPost = {...post}
                updatedPost.delete = true;
                // add deleted in local post slice, to handle edge case of deleting from postpage
                dispatch(updatePostInSlice(updatedPost));
                
                // update in db
                await dispatch( deletePost(postId) );

                // update in profile feed
                dispatch(removePostFromProfile(postId));
            }catch(error){
                console.log('error deleting post - ', error.message);
            }
        }
        else{
            console.log('not delete')
        }
        // remove post from feed

    }

    return (
        <PostCardDiv>
            <div className="post-toprow flex items-center">
                <div>
                    <Avatar avatarSize={"medium"} avatarUrl={post.publisher.avatarUrl ? post.publisher.avatarUrl: "" } />
                </div>
                <div className="flex items-end flex-grow justify-between">
                    <div className="px-2">
                        <Link to={"/profile/"+post.publisher._id} className="mb-1">{post.publisher.name}</Link>
                        <h4 className="text-xs tracking-wide leading-4 text-gray-400">
                            @{post.publisher.username}
                        </h4>
                    </div>
                    <span className="text-xs tracking-wide leading-4 text-gray-400 px-2">
                        {formatDistanceToNow(new Date(post.createdAt)) + " ago"}
                    </span>
                </div>
            </div>

            <hr className="mt-2"/>

            <div className="p-2 post-content text-sm text-gray-700">
                <p className="post-text">{post.content}</p>
                {post.images.length > 0 && <img loading="lazy" src={optimizedImage} alt="post image" className="my-2 rounded" />} 
                <br />
                <div className="flex items-center gap-x-2">
                    {
                        post.hashtags?.length > 0 && post.hashtags?.map(tag => {
                            return (
                                <span key={nanoid()} className="py-1 px-2 text-xs bg-purple-100 text-purple-900 rounded">
                                    #{tag}
                                </span>
                            )
                        })
                    }
                </div>
            </div>

            <hr />

            <div className="p-2 flex justify-between items-center">
                <div className="flex gap-x-6">
                    
                    <button type="button" aria-label="like" onClick={likePostClicked} className="flex items-center text-xl gap-x-1">
                        {
                            isThisPostLiked
                            ?
                            <FaHeart className="text-red-500" />
                            :
                            <FaRegHeart className="text-red-500"/>
                        }
                        <small className="ml-1 text-sm">{post.likes.length > 0 ? post.likes.length : ""}</small>
                    </button>
                    <Link to={"/posts/"+post._id} className="flex items-center link-button text-xl gap-x-1" aria-label="Comment">
                        <FaRegComment /> 
                        <small className="ml-1 text-sm">{post.comments.length > 0 ? post.comments.length : ""}</small>
                    </Link>
                </div>

                {
                    authState.userId === post.publisher._id
                    ?
                    <div className="delete-button-wrapper">
                        <button onClick={removePost} className="mt-1 mr-1" aria-label="delete post" title="delete post?">
                            <FaRegTrashAlt className="text-red-500"  />
                        </button>
                    </div>
                    : null
                }
            </div>
        </PostCardDiv>
    )
}
