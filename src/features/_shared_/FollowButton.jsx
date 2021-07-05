import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {MdAdd} from 'react-icons/md';

import {followUser, unfollowUser} from "@/features/followers/followersSlice";

const BtnFollow = styled.button`
    padding: 0.35rem 0.75rem;
    display:flex;
    border-radius: 0.25rem;
    color: white;    
    align-items: center;
    justify-content: center;
    transition: background ease 0.35s;

    &.btn-follow{
        background-color: var(--primary);
        border: 1px solid var(--primary-light);
    }
    &.btn-unfollow{
        background-color: var(--primary-light);
        border: 1px solid var(--primary-light);
        color: var(--primary);
    }
    &:hover{
        background: var(--primary-dark);
        color: white;
    }

    &:disabled{
        background: #ccc !important;
        color: var(--card-bg) !important;
    }
`;

export default function FollowButton({followUserId, listOfFollowers}) {
    const authState = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    const [alreadyFollowing, setAlreadyFollowing] = useState(false);
    const [processingFollow, setProcessingFollow] = useState(false);

    useEffect(() => {
        if(checkIfFollowing(listOfFollowers, authState.userId)){
            setAlreadyFollowing(true);
        }
        else{
            setAlreadyFollowing(false);
        }
    }, [listOfFollowers]);

    // check if I follow this user
    function checkIfFollowing(listOfFollowersUsers, myUserId){
        return !!listOfFollowersUsers.find((follower) => follower.userId._id === myUserId);
    }

    async function followButtonClicked(){
        setProcessingFollow(true);

        // dispatch to add FollowUserId to listOfFollowers of user
        if(alreadyFollowing){
            console.log('dispatch unfollow');
            await dispatch(unfollowUser({userId: authState.userId, followUserId:followUserId}));
        }
        // dispatch unfollow
        else{
            console.log('dispach follow..');
            await dispatch(followUser({userId: authState.userId, followUserId:followUserId}));
        }

        setProcessingFollow(false);
        // try{
            
        // }
        // catch(error){
        //     setProcessingFollow(false);
        //     console.log('error when changing follow: ', error.message);
        // }

    }

    return (
        // disable when already following
        <BtnFollow onClick={followButtonClicked} disabled={processingFollow} className={alreadyFollowing ? "btn-unfollow":"btn-follow"}>
            {
                !alreadyFollowing ?
                <span className="flex items-center">
                    <MdAdd className="mr-1" /> Follow
                </span>
                :
                "Unfollow"
            }
        </BtnFollow>
    )
}
