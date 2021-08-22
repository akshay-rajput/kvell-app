import React from "react";
import { useSelector } from "react-redux";
import PostCard from '@/features/posts/PostCard';

export default function GeneralFeed(){
    const {generalFeed} = useSelector(state => state.feed);
    
    return(
        <>
            <div className="general-feed-container">
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

        </>
    )
}