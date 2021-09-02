import React, {useEffect} from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux';
import {getTopUsers} from '@/features/feed/feedSlice';
import useWindowDimensions from "@/hooks/useWindowDimensions";
import UserCard from '@/features/search/UserCard';
import styled from 'styled-components';

const TopPosters = styled.div`
    position: sticky;
    top: 0;
    border-radius: var(--border-radius);
    border: 1px solid var(--primary-light);
    background: var(--card-bg);
`;
export default function TopContributors(){
    const {topContributors, topContributorStatus} = useSelector(state => state.feed);
    const dispatch = useDispatch();

    const {width} = useWindowDimensions();

    useEffect(()=> {
        (async function(){
            if(topContributorStatus === "Idle" && width > 767){
                await dispatch(getTopUsers());
            }
        })();
    }, []);

    return(
        <TopPosters className="p-4 flex flex-col">
            <h4 className="text-lg font-semibold mb-2 text-gray-400">Top Contributors</h4>
            {
                topContributorStatus === "Loading"
                && 
                <div className="flex items-center justify-center h-24">
                    <ImSpinner8 className="loading-icon text-purple-600 text-lg"/>
                </div>
            }

            {
                topContributorStatus === "Fulfilled"
                && 
                <div className="">
                    {
                        topContributors.map(contributor => {
                            return(
                                <div className="mb-2" key={contributor.userInfo._id}>
                                    <UserCard user={contributor.userInfo} numberOfPosts={contributor.totalPosts} />
                                </div>
                            )
                        })
                    }
                </div>
            }

            {
                topContributorStatus === "Rejected"
                && <span className="text-sm text-gray-400">Something went wrong. Please refresh!</span>
            }
        </TopPosters>
    )
}