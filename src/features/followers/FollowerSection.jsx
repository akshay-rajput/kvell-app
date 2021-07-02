import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Avatar from "@/features/_shared_/UserAvatar";
import { useSelector, useDispatch } from 'react-redux';
import {MdKeyboardArrowRight} from "react-icons/md";

import { getUserFollowerData } from '@/features/followers/followersSlice';
import FollowerListPopup from "@/features/followers/FollowerListPopup";
import styled from 'styled-components';

const ProfileFollowSection = styled.div`
    border: 1px solid var(--primary-light);
    border-radius: var(--border-radius);
    background: var(--card-bg);
    padding: 0.5rem;
    margin-top: 1rem;
`;

export default function FollowerSection({userId}) {
    const authState = useSelector(state => state.authentication);
    const followState = useSelector(state => state.follow);
    const profileState = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const initialPopupState = {
        listType: "",
        listOfProfiles: [],
        isPopupOpen: false
    }
    const [followerPopupState, setFollowerPopupState] = useState(initialPopupState);

    useEffect(() => {
        // console.log("compare state user with current: ", profileState.userData._id + " --- "+ userId)
        if(profileState.userData._id !== userId){
            dispatch(getUserFollowerData(userId));
            // dispatch(getUserPosts(userId));
        }
        if(followState.status == "Idle" && authState.token){
            dispatch(getUserFollowerData(userId));    
        }
    }, [dispatch, followState.status, userId]);

    // open popup
    function openFollowPopup(typeOfList, profileList){
        // console.log('clicked show all..', typeOfList + " --- ", profileList);
        setFollowerPopupState(prevState => (
            { 
                listType: typeOfList,
                listOfProfiles: profileList,
                isPopupOpen: true
            }
        ));
    }

    function closePopup(){
        console.log("close pop");
        setFollowerPopupState(prevState => (
            { 
                ...prevState,
                isPopupOpen: false
            }
        ));
    }

    return (
        <ProfileFollowSection>
            <div className="user-followers">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-500 text-sm">Followers {followState.followers.length ? "("+followState.followers.length+")" : ""}
                    </h3>
                    {
                        followState.followers?.length > 0 &&
                        <button onClick={() => openFollowPopup("Followers", followState.followers)} className="text-xs flex items-center text-purple-700 hover:text-yellow-700">Show all <MdKeyboardArrowRight /></button>
                    }
                </div>
                <div className="overflow-hidden grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 mt-2">
                    {
                        followState.followers?.length > 0 ?
                        followState.followers.slice(0, 4).map(follower => {
                            return(
                                <Link to={"/profile/"+follower.userId._id} key={follower._id} title={follower.userId.name}>
                                    <Avatar avatarSize={"medium"} avatarUrl={follower.userId.avatarUrl} />
                                </Link>
                            )
                        })
                        :
                        <small className="text-gray-400 col-span-4">Not followed by anyone</small>                        
                    }

                </div>
            </div>
            
            <hr className="my-4" />
            
            <div className="user-following">
                <div className="flex justify-between items-center">
                    <h3 className="text-gray-500 text-sm">Following {followState.following.length ? "("+followState.following.length+")" : ""}</h3>
                    {
                        followState.following?.length > 0 &&
                        <button onClick={() => openFollowPopup("Following", followState.following)} className="text-xs flex items-center text-purple-700 hover:text-yellow-700">Show all <MdKeyboardArrowRight /></button>
                    }
                </div>

                <div className="overflow-hidden grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 mt-2">
                    {
                        followState.following?.length > 0 ?
                        followState.following?.slice(0, 4).map(following => {
                            return(
                                <Link to={"/profile/"+following.follows._id} key={following._id} title={following.follows.name}>
                                    <Avatar key={following._id} avatarSize={"medium"} avatarUrl={following.follows.avatarUrl} />
                                </Link>
                            )
                        })
                        :
                        <small className="text-gray-400 col-span-4">Not following anyone</small>                        
                    }
                    {/* <Avatar avatarSize={"medium"} avatarUrl={profileState.userData.avatarUrl} /> */}
                </div>
            </div>

            {
                followerPopupState.isPopupOpen && 
                <FollowerListPopup followerPopupData = {followerPopupState} closePopup={closePopup} />
            }
        </ProfileFollowSection>
    )
}
