import React from 'react';
import styled from 'styled-components';
import Avatar from "@/features/_shared_/UserAvatar";
import {Link} from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { parseISO, formatDistanceToNow } from 'date-fns'
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa';

const PostCardDiv = styled.div`
    border: 1px solid var(--primary-light);
    background: var(--card-bg);
    border-radius: var(--border-radius);

    .post-content{
        min-height: 4rem;

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

export default function PostCard({post}) {
    return (
        <PostCardDiv>
            <div className="post-toprow flex items-center">
                <div>
                    <Avatar avatarSize={"medium"} avatarUrl={post.publisher.avatarUrl} />
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
                <p>{post.content}</p>
                {post.images.length > 0 && <img src={post.images[0].imageUrl} alt="post image" className="my-2 rounded" />} 
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
                    
                    <div className="flex items-center text-xl gap-x-1">
                        <FaHeart className="text-red-500" />
                        <FaRegHeart className="text-red-500"/>
                        <small className="ml-1">{post.likes.length > 0 ? post.likes.length : ""}</small>
                    </div>
                    <Link to={"/posts/"+post._id} className="flex items-center text-xl gap-x-1">
                        <FaRegComment /> 
                        <small className="ml-1">{post.comments.length > 0 ? post.comments.length : ""}</small>
                    </Link>
                </div>

                <small className="text-gray-400">
                    {new Date(post.createdAt).toDateString()} 
                    <span className="mx-2">&bull;</span>
                    {new Date(post.createdAt).toLocaleTimeString()}
                </small>
            </div>
        </PostCardDiv>
    )
}
