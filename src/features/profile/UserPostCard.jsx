import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Avatar from "@/features/_shared_/UserAvatar";
import { updatePostInProfile } from '@/features/profile/profileSlice';
import {checkIfLiked} from '@/utils/checkIfLiked';
import { updatePost } from '@/features/posts/postSlice';
import { updatePostInFeed } from '@/features/feed/feedSlice';
import { createNewNotification } from '@/features/notifications/notificationSlice';

import {Link} from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { formatDistanceToNow } from 'date-fns'
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

const PostCard = styled.div`
    border: 1px solid var(--primary-light);
    background: var(--card-bg);
    border-radius: var(--border-radius);

    .post-content{
        // min-height: 4rem;
        
        .post-text{
            white-space: pre-wrap;
        }
        
        img{
            max-width: 350px;
            border-radius: var(--border-radius);
        }
    }

    @media(max-width: 480px){
        .post-content img{
            max-width: 100%;
        }
    }
`;

export default function UserPostCard({postData, userInfo}) {
    const authState = useSelector((state) => state.authentication);
    const dispatch = useDispatch();

    let isThisPostLiked = checkIfLiked(postData.likes, authState.userId);

    const [optimizedImage, setOptimizedImage] = useState("");

    useEffect(() => {
        if(postData.images[0]?.imageUrl){
            let position = postData.images[0].imageUrl.indexOf("upload") + 7;
            let dynamic_width = `w_auto,c_scale/q_auto/f_auto/`;
            let opt_img_url = postData.images[0].imageUrl.substring(0, position) + dynamic_width + postData.images[0].imageUrl.substring(position);

            setOptimizedImage(opt_img_url);
        }
    }, [postData]);

    async function likePostClicked(){
        // console.log('liked..');

        let clonedPost = JSON.parse(JSON.stringify(postData));

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
            await dispatch(updatePostInProfile(clonedPost));

            // update in db
            await dispatch(updatePost({
                updatedPost: clonedPost,
                postId: clonedPost._id
            }));

            await dispatch(updatePostInFeed(clonedPost));

            // send notification if not liking own post
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

    return (
        <PostCard className="p-2 shadow-sm mb-8">
            <div className="post-toprow flex items-center">
                <div>
                    <Avatar avatarSize={"medium"} avatarUrl={userInfo.avatarUrl} />
                </div>
                <div className="flex items-end justify-between flex-grow">
                    <div className="px-2">
                        <Link to={"/profile/"+userInfo._id} className="mb-1">{userInfo.name}</Link>
                        <h4 className="text-xs tracking-wide leading-4 text-gray-400">
                            @{userInfo.username}
                        </h4>
                    </div>
                    <span className="text-xs tracking-wide leading-4 text-gray-400 px-2">
                        {formatDistanceToNow(new Date(postData.createdAt)) + " ago"}
                    </span>
                </div>
            </div>

            <hr className="mt-2"/>

            <div className="p-2 post-content text-sm text-gray-700">
                <p className="post-text">{postData.content}</p>
                <br />
                {postData.images.length > 0 && <img loading="lazy" src={optimizedImage} alt="post image" className="my-2" />}
                <br />
                <div className="flex items-center gap-x-2">
                    {
                        postData.hashtags?.length > 0 && postData.hashtags?.map(tag => {
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
                        <small className="ml-1 text-sm">{postData.likes.length > 0 ? postData.likes.length : ""}</small>
                    </button>
                    <Link to={"/posts/"+postData._id} className="flex text-xl items-center gap-x-1" aria-label="Comment">
                        <FaRegComment /> 
                        <small className="ml-1 text-sm">{postData.comments.length > 0 ? postData.comments.length : ""}</small>
                    </Link>
                </div>

            </div>
        </PostCard>
    )
}
