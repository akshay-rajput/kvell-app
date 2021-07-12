import React from "react";
import { useSelector } from "react-redux";
import PostCard from '@/features/posts/PostCard';
import {ImSpinner8} from 'react-icons/im';

export default function GeneralFeed(){
    const {generalFeed, generalFeedStatus} = useSelector(state => state.feed);
    
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