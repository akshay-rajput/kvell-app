import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GrFacebook, GrInstagram, GrLinkedin, GrTwitter} from "react-icons/gr";
import {FaExternalLinkAlt, FaBirthdayCake, FaMapMarkerAlt} from 'react-icons/fa';
import FollowButton from '@/features/_shared_/FollowButton';

export default function UserProfileInfo({userData}) {
    const authState = useSelector(state => state.authentication);
    const {followers} = useSelector(state => state.follow);
    return (
        <div className="p-2 md:px-4 md:py-2">
            <div className="flex justify-between">
                <div className="">
                    <h3 className="text-gray-600 text-xl mb-1">{userData.name}</h3>
                    <h3 className="text-gray-600 text-md mb-1">@{userData.username}</h3>
                </div>

                {
                    authState.userId !== userData._id ?
                    <div className="">
                        <FollowButton followUserId={userData._id} listOfFollowers={followers} />
                    </div>
                    : null
                }
            </div>
            <p className="text-gray-500 text-sm">
                {userData.bio}
            </p>
            <div className="flex my-2 gap-4 flex-wrap">
                {
                    userData.location &&
                    <div className="user-location flex items-center gap-x-1 text-sm text-gray-500">
                        <FaMapMarkerAlt className="" />{userData.location}
                    </div>
                }

                <div className="user-joined flex items-center gap-x-1 text-sm text-gray-500">
                    <FaBirthdayCake className="" /> 
                    <span>Joined :</span>
                    {new Date(userData.createdAt).toDateString().substring(4)}
                </div>
                
                <div className="user-links flex gap-x-3 items-center">
                    {
                        userData.links?.length > 0 && userData.links.map(link => {
                            return(
                                link.url !== "" ? 
                                <a href={link.url} key={link.linkType} aria-label={link.linkType} className="text-red-400" target="_blank" rel="noopener noreferrer">
                                    {
                                        link.linkType === "Instagram" ? <GrInstagram className=""/> :
                                        link.linkType === "Facebook" ? <GrFacebook className="" /> :
                                        link.linkType === "LinkedIn" ? <GrLinkedin className="" /> :
                                        link.linkType === "Twitter" ? <GrTwitter className="" /> :
                                        <FaExternalLinkAlt className="" />
                                    }
                                </a>
                                : null
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
