import React from 'react';
import styled from 'styled-components';
import Avatar from "@/features/_shared_/UserAvatar";
import {Link} from 'react-router-dom';
import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa';

const PostCard = styled.div`
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

export default function UserPostCard({postData, userInfo}) {
    return (
        <PostCard className="p-2 shadow-sm mb-8">
            <div className="post-toprow flex items-center">
                <div>
                    <Avatar avatarSize={"medium"} avatarUrl={userInfo.avatarUrl} />
                </div>
                <div className="px-2">
                    <Link to={"/profile"+userInfo.userId} className="mb-1">{userInfo.name}</Link>
                    <h4 className="text-xs tracking-wide leading-4 text-gray-400">
                        @{userInfo.username}
                    </h4>
                </div>
                <span className=""></span>
            </div>

            <hr className="mt-2"/>

            <p className="p-2 post-content text-sm text-gray-700">
                {postData.content}
                <br />
                {postData.images.length > 0 && <img src={postData.images[0].imageUrl} alt="post image" className="my-2" />}
            </p>

            <hr />

            <div className="pt-2 px-2 pb-1 flex justify-between items-center">
                <div className="flex gap-x-6">
                    
                    <div className="flex items-center gap-x-1">
                        <FaHeart className="text-red-500" />
                        <FaRegHeart className="text-red-500"/>
                        <small className="ml-1">{postData.comments.length}</small>
                    </div>
                    <Link to={"/posts/"+postData._id} className="flex items-center gap-x-1">
                        <FaRegComment /> 
                        <small className="ml-1">{postData.comments.length}</small>
                    </Link>
                </div>

                <small className="text-gray-400">
                    {new Date(postData.createdAt).toDateString()} 
                    <span className="mx-2">&bull;</span>
                    {new Date(postData.createdAt).toLocaleTimeString()}
                </small>
            </div>
        </PostCard>
    )
}
