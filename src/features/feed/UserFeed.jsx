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
            if((userFeedStatus == "Idle" && authState.token)){
                await dispatch(getUserFeed(authState.userId));    
            }
        })();
        return () => {
            console.log('unmount userfeed');
        }
    }, [])
    
    return(
        <>
            <div className="user-feed-container">
                {
                    userFeedStatus == "Loading" ? 
                    <ImSpinner8 className="loading-icon" /> 
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
                            <p className="rounded p-4 my-4 border border-gray-300">No custom posts</p>
                        }
                    </div>
                }
            
            </div>    

        </>
    )
}