import React, {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import {ImSpinner8} from 'react-icons/im';

import styled from 'styled-components';
import { Button } from '@material-ui/core';

import logo from '/logo.svg';
import useLocalStorage from '@/hooks/useLocalStorage';
import FeatureSlider from '@/features/_shared_/FeatureSlider';

const AppName = styled.h2`
        color: var(--primary-dark);
    `;

const SignupSection = styled.div`
        background: var(--card-bg);
        border: 1px solid var(--primary-light);
        border-radius: var(--border-radius);
        width: 95%;
        margin: auto;

        @media(min-width: 768px){
            max-width: 1000px;
        }

    `;
const PasswordVisibilityToggler = styled.button`
        font-size: 1.25rem;
        position: absolute;
        right: 1px;
        top: 1px;
        bottom: 1px;
        padding: 0.5rem 0.5rem;
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
    `;

export default function Signup() {

    let navigate = useNavigate();

    const initialState = {
        name: "",
        username: "",
        email: "",
        password: "",
        isSubmitting: false,
        errorMessage: null
    }
    const [signupData, setSignupData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const password = useRef(null);

    async function doSignup(event){
        event.preventDefault();
        
        // loading
        setSignupData({
            ...signupData,
            isSubmitting: true,
            errorMessage: null
        })

        // console.log("formData: ", formData);
        // make a request and dispatch
        try{
            const response = await axios.post("https://kvell-app.herokuapp.com/signup", signupData);

            if(response.data.success){
                let userData = {
                    name: response.data.user.name,
                    id: response.data.user._id
                }
    
                // finish loading
                setSignupData({
                    ...signupData,
                    isSubmitting: false,
                    errorMessage: null
                })
    
                // show toast of successful signup and navigate

                toast.success(`Signed up successfully`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                navigate('/login');
            }
            else{
                console.log('response unsuccessful')
                // finish loading
                setSignupData({
                    ...signupData,
                    isSubmitting: false,
                    errorMessage: response.data.message
                })

                toast.error(`Error: ${response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
        catch(error){
            console.log('Error signup: ', error.response.data);

            // finish loading
            setSignupData({
                ...signupData,
                isSubmitting: false,
                errorMessage: error.response?.data.message
            })

            if(error.response){
                toast.error(`Error: ${error.response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }else{
                toast.error(`Error during signup`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
            
        }

    }

    function handleInputChange(event){
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <SignupSection className="shadow-sm grid grid-cols-12 gap-6">
            <div  className="col-span-12 md:col-span-6 p-4">
                <AppName className="flex items-center mb-4 tracking-wide text-lg">
                    <img src={logo} alt="Kvell" className="h-4" />
                    Kvell
                </AppName>

                <h3 className="text-2xl font-bold mb-1 text-gray-500">Signup</h3>
                <p className="text-xs text-gray-400 mb-6">Signup to use all features of app.</p>

                <form onSubmit={doSignup}>
                    <label className="flex flex-col mb-4 text-sm text-gray-400 mb1">
                        Email
                        <input type="email" id="user_email" name="email" value={signupData.email} onChange={handleInputChange}
                                autoComplete="true" placeholder="abc@example.com" className="" required/>    
                    </label>

                    <div className="flex flex-wrap items-center md:gap-4">
                        <label className="flex-grow flex flex-col mb-4 text-sm text-gray-400 mb1">
                            Name
                            <input type="text" id="user_name" name="name" value={signupData.name} onChange={handleInputChange}
                                    autoComplete="true" placeholder="Your name" className="" required/>    
                        </label>

                        <label className="flex-grow flex flex-col mb-4 text-sm text-gray-400 mb1">
                            Username
                            <input type="text" id="user_username" name="username" value={signupData.username} onChange={handleInputChange}
                                    autoComplete="true" placeholder="Provide unique username" className="" required/>    
                        </label>
                    </div>

                    <label className="flex flex-col relative mb-6 text-sm text-gray-400 mb1">
                        Password
                        <div className="relative">
                            <input type={showPassword ? "text":"password"} id="user_password" name='password' ref={password}  onChange={handleInputChange}
                                    placeholder="Enter Password" className="w-full" required/>  

                            <PasswordVisibilityToggler type="button" aria-label="Toggle Password visibility" onClick={() => setShowPassword(!showPassword)} className="cursor-pointer block text-gray-500">
                                {
                                    showPassword ? <MdVisibility /> : <MdVisibilityOff /> 
                                }
                            </PasswordVisibilityToggler>
                        </div>
                    </label>

                    <Button type="submit" disabled={signupData.isSubmitting} variant="contained" className="btn-primary w-full">
                        {
                            signupData.isSubmitting ? 
                            <span className="flex items-center">
                                <ImSpinner8 className="loading-icon mr-2"/> Please Wait
                            </span> 
                            : "Signup"} 
                    </Button>

                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Already a member?
                    <Link to="/login" className="ml-1">
                        Login
                    </Link>
                </p>

            </div>

            <div className="col-span-12 md:col-span-6">
                <FeatureSlider />
            </div>
        </SignupSection>
    )
}
