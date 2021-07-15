import React from 'react'
import AddPost from "@/features/posts/AddPost";
import UserFeed from '../features/feed/UserFeed';
import GeneralFeed from '../features/feed/GeneralFeed';
import useWindowDimensions from "@/hooks/useWindowDimensions";

export default function Home() {
    const {width, height} = useWindowDimensions();

    return (
        <div>
            {
                width >= 768 ?
                <AddPost /> : null
            }
            <UserFeed />
            <GeneralFeed />
        </div>
    )
}
