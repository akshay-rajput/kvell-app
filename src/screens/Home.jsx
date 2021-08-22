import React, {Suspense} from 'react'
import UserFeed from '@/features/feed/UserFeed';
import GeneralFeed from '@/features/feed/GeneralFeed';
import useWindowDimensions from "@/hooks/useWindowDimensions";

const TopContributors = React.lazy(() => import('@/features/feed/TopContributors'));
const AddPost = React.lazy(() => import('@/features/posts/AddPost'));

export default function Home() {
    const {width, height} = useWindowDimensions();

    return (
        <div className="grid grid-cols-5 gap-x-4 lg:gap-x-8 w-full mb-4">
            <div className="col-span-5 md:col-span-3">
                {
                    width >= 768 ?
                    <Suspense fallback={<div></div>}>
                        <AddPost />
                    </Suspense>
                    : null
                }
                <UserFeed />
                <GeneralFeed />
            </div>

            <div className="col-span-5 md:col-span-2">
                {
                    width >= 768 ?
                    <Suspense fallback={<div></div>}>
                        <TopContributors />
                    </Suspense>
                    : null
                }
            </div>
        </div>
    )
}
