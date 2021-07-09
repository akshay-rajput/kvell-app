import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getGeneralFeed} from '@/features/feed/feedSlice';
import PostCard from '@/features/posts/PostCard';
import {ImSpinner8} from 'react-icons/im';

export default function GeneralFeed(){
    const {generalFeed, generalFeedStatus} = useSelector(state => state.feed);
    const dispatch = useDispatch();

    useEffect(() => {
        (async function(){
            console.log('genstatus; ', generalFeedStatus);
            if((generalFeedStatus == "Idle")){
                await dispatch(getGeneralFeed());    
            }
        })();
        return () => {
            console.log('unmount generalfeed');
        }
    }, []);
    
    return(
        <>
            <div className="general-feed-container">
                {
                    generalFeedStatus == "Loading" ? 
                    <ImSpinner8 className="loading-icon" /> 
                    :
                    <div className="">
                        {
                            generalFeed.length > 0 && 
                            <h4 className="my-2 text-gray-400 text-lg">Posts from community</h4>
                        }
                        
                        {
                            generalFeed.map(post => {
                                return(
                                    <div key={post._id} className="mb-4">
                                        <PostCard post={post}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            
            </div>    

        </>
    )
}