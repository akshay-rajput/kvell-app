import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from 'react-router-dom';

import ErrorState from "@/features/_shared_/ErrorState";
import Avatar from "@/features/_shared_/UserAvatar";
import UserProfileInfo from "@/features/profile/UserProfileInfo";
import UserPostCard from "@/features/profile/UserPostCard";
import UserFollowerSection from '@/features/followers/FollowerSection';

import {LOGOUT} from '@/features/authentication/authenticationSlice';
import { getUserData, getUserPosts, resetProfile } from '@/features/profile/profileSlice';
import {resetFollowerData} from '@/features/followers/followersSlice';
import {ImSpinner8} from "react-icons/im";
import {MdSettings} from "react-icons/md";


export default function Profile() {
    const authState = useSelector(state => state.authentication);
    const profileState = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const {userId} = useParams();

    useEffect(() => {
        // fetch data when store empty or if stored profile doesn't match userid in url
        (async function(){
            // avoid multiple calls if already loading
            if((profileState.userData._id !== userId && profileState.status !== "Loading")){
                await dispatch(getUserData({userId, calledBy: "userId different"}));
                await dispatch(getUserPosts(userId));
            }
            
            // incase refreshing your own profile page
            if(( (profileState.userData._id == userId) && profileState.status == "Idle" && authState.token)){
                await dispatch(getUserData({userId, calledBy: "status was idle"}));
                await dispatch(getUserPosts(userId));    
            }
        })();
    }, [dispatch, profileState.status, userId]);

    function logoutUser(){
		console.log('loggin out...');
		dispatch(LOGOUT());
        dispatch(resetProfile());
        dispatch(resetFollowerData());
	}

    return (
        <div className="w-full mb-12">
            {
                profileState.status ==="Fulfilled" && 
                <div className="">
                    <div className="button-group flex-grow flex justify-end gap-x-2 items-end">
                        {
                            authState.userId === profileState.userData._id ? 
                            <Link to="/profile/edit" className="link-button flex items-center p-2 text-xs md:text-sm">
                                <MdSettings className="mr-1" /> Edit Profile
                            </Link>
                            : null
                        }
                        <button className="text-purple-700 hover:text-yellow-500 p-2 text-xs md:text-sm" onClick={logoutUser}>
                            Logout
                        </button>
                    </div>

                    <div className="flex items-start flex-wrap md:flex-nowrap">
                        <div className="">
                            <Avatar avatarSize={"large"} avatarUrl={profileState.userData.avatarUrl} />
                        </div>
                        <div className="flex-grow">
                            <UserProfileInfo userData={profileState.userData} />
                        </div>    
                    </div>

                    <hr />

                    <div className="grid grid-cols-12 gap-4 md:gap-8">

                        <div className="follow-section col-span-12 md:col-span-4">
                            <UserFollowerSection userId={userId} />
                        </div>

                        <div className="user-posts-section mt-4 col-span-12 md:col-span-8">
                            <h3 className="text-gray-500 md:hidden text-lg my-2">Posts <small className="text-gray-400">{profileState.userPosts.length ? "("+profileState.userPosts.length+")" : ""}</small></h3>
                            {
                                profileState.userPosts.length > 0 ? 
                                profileState.userPosts.map(post => {
                                    return (
                                        <UserPostCard key={post._id} postData={post} userInfo={profileState.userData} />
                                    )
                                })
                                :
                                <div className="flex p-16 rounded-lg border border-purple-200 shadow-sm items-center justify-center text-gray-400 text-sm">This user has no posts yet.</div>
                            }
                        </div>
                    </div>
                    
                </div>
            }

            {
                profileState.status === "Loading" && 
                <div className="flex w-full h-full items-center justify-center">
                    <ImSpinner8 className="loading-icon text-4xl text-gray-400" />
                </div>
            }
            {
                profileState.status === "Rejected" && 
                <ErrorState />
            }
        </div>
    )
}
