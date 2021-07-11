import React from 'react'
import AddPost from "@/features/posts/AddPost";
import UserFeed from '../features/feed/UserFeed';
import GeneralFeed from '../features/feed/GeneralFeed';

export default function Home() {
    return (
        <div>
            <AddPost />
            <UserFeed />
            <GeneralFeed />
        </div>
    )
}
