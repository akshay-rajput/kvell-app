import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUserFeed} from '@/features/feed/feedSlice';
import PostCard from '@/features/posts/PostCard';
import {ImSpinner8} from 'react-icons/im';

export default function UserFeed(){
    const authState = useSelector(state => state.authentication);
    const {userFeed, userFeedStatus} = useSelector(state => state.feed);
    const dispatch = useDispatch();

    useEffect(() => {
        (async function(){
            if((userFeedStatus == "Idle" && authState.token) || (userFeedStatus == "Expired" && authState.token)){
                await dispatch(getUserFeed(authState.userId));
            }
        })();
        // return () => {
        //     console.log('unmount userfeed');
        // }
    }, [authState.token]);
    
    return(
        <>
            <div className="user-feed-container flex flex-col flex-grow">
                <h4 className="text-gray-400 text-lg mb-2">Your Feed</h4>
                {
                    userFeedStatus == "Loading" ? 
                    <div className="flex items-center justify-center h-24">
                        <ImSpinner8 className="loading-icon text-purple-600 text-2xl" />
                    </div> 
                    :
                    <div className="">
                        {
                            userFeed.length > 0 ?
                            userFeed.map(post => {
                                return(
                                    <div key={post._id} className="mb-4">
                                        <PostCard post={post}/>
                                    </div>
                                )
                            })
                            :
                            <p className="rounded py-4 px-2 mb-6 text-center text-xs text-gray-400 border border-gray-300">
                                Your posts and the posts of people you follow will appear here.
                                <br /> You can check out posts from our community below.
                            </p>
                        }
                    </div>
                }
            
            </div>    

        </>
    )
}