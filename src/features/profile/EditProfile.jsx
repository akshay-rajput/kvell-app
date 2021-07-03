import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {MdKeyboardArrowLeft, MdSave} from 'react-icons/md';
import ErrorState from "@/features/_shared_/ErrorState";
import { getUserData, getUserPosts, saveUserData } from '@/features/profile/profileSlice';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import {toast} from 'react-toastify';
import {ImSpinner8} from "react-icons/im";

const ProfileForm = styled.div`
    
    .btn-back{
        color: var(--primary-dark);
        transition: color ease 0.35s;
    
        :hover{
            color: var(--dark);
        }
    }

    form{
        background: var(--card-bg);
        border-radius: var(--border-radius);
        margin: 1rem 0;
        padding: 1rem 0.5rem;
        
        .input-group{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            margin-bottom: 2rem;
            column-gap: 0.5rem;
            // align-items: center;

            label{
                padding-top: 0.1rem;
                grid-column-start: span 4;
                color: #aaa;
                // grid-column-end: 4;
            }
            .user-email, input, textarea{
                grid-column-start: span 8;
                // grid-column-end: 12;
            }
        }
        
        
    }
`;

function saveProfile(){
    console.log('saving...')
}

export default function EditProfile() {
    const authState = useSelector(state => state.authentication);
    const profileState = useSelector(state => state.profile);
    const dispatch = useDispatch();

    let navigate = useNavigate();

    useEffect(() => {
        if((profileState.status == "Idle" && authState.token)){
            dispatch(getUserData(authState.userId));
            dispatch(getUserPosts(authState.userId));
        }
        // when reloading prepopulate form
        setProfileData(initialFormState);
    }, [dispatch, profileState.status]);

    const initialFormState = {
        user : profileState.userData,
        isSubmitting: false,
        errorMessage: null
    }

    const [profileData, setProfileData] = useState(initialFormState);

    async function saveProfile(event){
        event.preventDefault();

        // start loading
        setProfileData(prevState => {
            return{
                ...prevState,
                isSubmitting : true
            }
        });

        try{
            // dispatch action to save profile
            await dispatch(saveUserData({userId: authState.userId, userData: profileData.user}));
        
            toast.success(`Profile updated successfully`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        catch(error){
            
            toast.error(`There was a problem while saving profile`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        setProfileData(prevState => {
            return{
                ...prevState,
                isSubmitting : false
            }
        });
    }

    function handleInputChange(event){
        let linkNames = ["Facebook", "LinkedIn", "Instagram", "Twitter", "Other"]
        if(linkNames.includes(event.target.name)){

            let newLinks = profileData.user.links.map(link => {
                if(link.linkType === event.target.name){
                    return {
                        ...link,
                        url: event.target.value
                    }
                }
                return link
            })
    
            setProfileData(prevState => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    links: newLinks
                }
            }))
            console.log('newLInk: ', newLinks);
        }
        else{
            setProfileData(prevState => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    [event.target.name]: event.target.value 
                } 
            }))
        }
    }

    return (
        <ProfileForm className="flex flex-col w-full">
            <div className="">
                <button className="btn-back flex items-center" onClick={()=> navigate(-1)}>
                    <MdKeyboardArrowLeft /> Back
                </button>
            </div>
            {
                profileState.status === "Fulfilled" && 
                <div className="">
                    <form onSubmit={saveProfile} className=""> 
                        <div className="input-group">
                            <label htmlFor="">Email</label>
                            <span className="user-email">{profileData.user.email}</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="">Username</label>
                            <span className="user-email">{profileData.user.username}</span>
                        </div>

                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter name" value={profileData.user.name} onChange={handleInputChange} required />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="location">Location</label>
                            <input type="text" name="location" id="location" placeholder="Enter location" value={profileData.user.location} onChange={handleInputChange} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea type="text" name="bio" id="bio" className="text-sm" placeholder="Enter bio" value={profileData.user.bio} onChange={handleInputChange} rows="3"></textarea>
                        </div>

                        <hr className="mb-4" style={{marginTop: "-1rem"}} />
                        <div className="flex flex-col text-gray-500 mb-4">
                            <label htmlFor="">Links</label>
                            <small className="">These links will show in your profile header section.</small>
                        </div>
                        {
                            profileData.user.links?.length > 0 &&
                            profileData.user.links.map((link, index) => {
                                return(
                                    <div key={link.linkType} className="input-group">
                                        <label htmlFor={link.linkType}>{link.linkType}</label>
                                        <input type="text" name={link.linkType} id={link.linkType} placeholder="Enter url" value={link.url} onChange={handleInputChange} />
                                    </div>
                                )
                            })
                        }



                        <div className="flex justify-end">
                            <Button type="submit" disabled={profileData.isSubmitting} variant="contained" className="btn-primary">
                                {
                                    profileData.isSubmitting ? 
                                    <ImSpinner8 className="loading-icon mr-1" /> :
                                    <MdSave className="mr-1" />
                                }
                                {
                                    profileData.isSubmitting ? "Saving" : "Save"
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            }

            {
                profileState.status === "Loading" && 
                <div className="flex w-full h-full items-center justify-center">
                    <ImSpinner8 className="loading-icon text-4xl text-gray-400" />
                </div>
            }
            {
                profileState.status === "Rejected" && 
                <ErrorState />
            }
        </ProfileForm>
    )
}
