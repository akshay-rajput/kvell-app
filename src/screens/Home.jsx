import React from 'react'
import AddPost from "@/features/posts/AddPost";
import UserFeed from '@/features/feed/UserFeed';
import GeneralFeed from '@/features/feed/GeneralFeed';
import TopContributors from '@/features/feed/TopContributors';
import useWindowDimensions from "@/hooks/useWindowDimensions";

export default function Home() {
    const {width, height} = useWindowDimensions();

    return (
        <div className="grid grid-cols-5 gap-x-4 lg:gap-x-8 w-full mb-4">
            <div className="col-span-5 md:col-span-3">
                {
                    width >= 768 ?
                    <AddPost /> : null
                }
                <UserFeed />
                <GeneralFeed />
            </div>

            <div className="col-span-5 md:col-span-2">
                {
                    width >= 768 ?
                    <TopContributors /> : null
                }
            </div>
        </div>
    )
}
