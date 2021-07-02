import React from 'react';
import {GrFacebook, GrInstagram, GrLinkedin, GrTwitter} from "react-icons/gr";
import {FaExternalLinkAlt, FaBirthdayCake, FaMapMarkerAlt} from 'react-icons/fa';
export default function UserProfileInfo({userData}) {
    
    return (
        <div className="p-2 md:px-4 md:py-2">
            <h3 className="text-gray-600 text-xl mb-1">{userData.username}</h3>
            <h3 className="text-gray-600 text-md mb-1">{userData.name}</h3>
            <p className="text-gray-500 text-sm">
                {userData.bio}
            </p>
            <div className="flex my-4 flex-wrap">
                {
                    userData.location &&
                    <div className="user-location flex items-center gap-x-1 text-sm text-gray-500 mr-4">
                        <FaMapMarkerAlt className="" />{userData.location}
                    </div>
                }

                <div className="user-joined flex items-center gap-x-1 text-sm text-gray-500 mr-4">
                    <FaBirthdayCake className="" /> 
                    <span>Joined :</span>
                    {new Date(userData.createdAt).toDateString().substring(4)}
                </div>
                
                <div className="user-links flex items-center">
                    {
                        userData.links?.length > 0 && userData.links.map(link => {
                            return(
                                <a href={link.url} key={link.linkType} className="mr-1 text-red-400" target="_blank" rel="noopener noreferrer">
                                    {
                                        link.linkType === "Instagram" ? <GrInstagram className="mr-2"/> :
                                        link.linkType === "Facebook" ? <GrFacebook className="mr-2" /> :
                                        link.linkType === "LinkedIn" ? <GrLinkedin className="mr-2" /> :
                                        link.linkType === "Twitter" ? <GrTwitter className="mr-2" /> :
                                        <FaExternalLinkAlt className="mr-2" />
                                    }
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
