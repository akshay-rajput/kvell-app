import React from 'react';
import { MdClose, MdAdd } from 'react-icons/md';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Avatar from "@/features/_shared_/UserAvatar";
import { Button } from '@material-ui/core'


const Popup = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    bottom: 0;
    z-index: 3;   

    .modal_backdrop{
        background: rgba(0,0,0,0.85);
        position: fixed;
        top: 0;
        left: 0;
        right:0;
        bottom: 0;
        z-index: 1;        
    }
    .modal_dialog{
        background: white;
        position: relative;
        width: 90%;
        max-width: 400px;
        // height: 250px;
        min-height: 200px;
        max-height: 500px;
        margin: 100px auto;
        z-index: 2;
        display: flex;
        flex-direction: column;
    }
    .btn_close{
        border-radius: 50%;
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;

        border: none;
        background-color: var(--primary-light);
        padding: 2px;
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
    }

`;

export default function FollowerListPopup({ followerPopupData, closePopup }) {
    
    return (
        <Popup className="modal">
            <div onClick={closePopup} className="modal_backdrop"></div>

            <div className="modal_dialog p-4 rounded-lg">
                <h4>{followerPopupData.listType} <small className="text-gray-400">({followerPopupData.listOfProfiles.length})</small></h4>

                <ul className="overflow-auto">
                    {
                        followerPopupData.listOfProfiles.map(profile => {
                            return (
                                <li key={profile._id} className="my-2 border border-purple-200 rounded-lg shadow-sm p-1">
                                    {
                                        followerPopupData.listType === "Followers" ? 
                                        <div className="flex gap-x-2 justify-between items-center">
                                            <div className="flex gap-x-2">
                                                <Link to={"/profile/"+profile.userId._id} >
                                                    <Avatar avatarSize={"medium"} avatarUrl={profile.userId.avatarUrl} />
                                                </Link>
                                                
                                                <div className="flex flex-col">
                                                    <Link to={"/profile/"+profile.userId._id} >
                                                        <h3>{profile.userId.name}</h3>
                                                    </Link>
                                                    <small className="text-gray-500">{profile.userId.username}</small>
                                                </div>
                                            </div>

                                        </div>
                                        : 
                                        <div className="flex gap-x-2 justify-between items-center">
                                            <div className="flex gap-x-2">
                                                <Link to={"/profile/"+profile.follows._id} >
                                                    <Avatar avatarSize={"medium"} avatarUrl={profile.follows.avatarUrl} />
                                                </Link>
                                                
                                                <div className="flex flex-col">
                                                    <Link to={"/profile/"+profile.follows._id} >
                                                        <h3>{profile.follows.name}</h3>
                                                    </Link>
                                                    <small className="text-gray-500">{profile.follows.username}</small>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </li>
                            )
                        })
                    }
                    
                </ul>

                <button type="button" className="btn_close" onClick={closePopup}>
                    <MdClose />
                </button>

            </div>

        </Popup>
    )
}
