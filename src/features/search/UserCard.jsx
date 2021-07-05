import React from 'react';
import styled from 'styled-components';
import Avatar from "@/features/_shared_/UserAvatar";
import {Link} from 'react-router-dom';
// import { nanoid } from '@reduxjs/toolkit';
// import {FaRegComment, FaRegHeart, FaHeart} from 'react-icons/fa';

const UserInfoCard = styled.div`
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    // margin-bottom: 1rem;
    border: 1px solid var(--primary-light);
    padding: 0.5rem;
`;

export default function UserCard({user}) {
    return (
        <UserInfoCard className="flex gap-x-2 shadow-sm justify-between items-center">
            <div className="flex gap-x-2">
                <Link to={"/profile/"+user._id} >
                    <Avatar avatarSize={"medium"} avatarUrl={user.avatarUrl} />
                </Link>
                
                <div className="flex flex-col">
                    <Link to={"/profile/"+user._id} >
                        <h3>{user.name}</h3>
                    </Link>
                    <small className="text-gray-500">@{user.username}</small>
                </div>
            </div>

            {/* <div className="">
                <Button variant="contained" className="btn-primary">
                    <MdAdd className="text-lg mr-1" /> Follow
                </Button>
            </div> */}

        </UserInfoCard>
    )
}
