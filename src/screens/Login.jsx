import React, {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import { toast } from 'react-toastify';

import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import {ImSpinner8} from 'react-icons/im';

import styled from 'styled-components';
import { Button } from '@material-ui/core';

import logo from '/logo.svg';
import useLocalStorage from '@/hooks/useLocalStorage';
import FeatureSlider from '@/features/_shared_/FeatureSlider';

import {LOGIN, LOGOUT} from '@/features/authentication/authenticationSlice';

const AppName = styled.h2`
        color: var(--primary-dark);
    `;

const LoginSection = styled.div`
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

    
export default function Login() {

    const [userId, setUserId] = useLocalStorage("userId", "");
    const [name, setName] = useLocalStorage("name", "");
    const [username, setUsername] = useLocalStorage("username", "");
    const [token, setToken] = useLocalStorage("token", null);
    const [userAvatar, setUserAvatar] = useLocalStorage("userAvatar", "");

    const authState = useSelector(state => state.authentication);
    const authDispatch = useDispatch();

    const initialState = {
        email: '',
        password: '',
        isSubmitting: false,
        errorMessage: null
    }
    const [loginData, setLoginData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const [processingLoginAsGuest, setProcessingLoginAsGuest] = useState(false);

    const password = useRef(null);

    let navigate = useNavigate();

    // if already logged in, navigate away
    // useEffect(() => {
    //     // console.log('authState: ', authState);
    //     if(authState.token){
    //         console.log("already logged in..");
    //         navigate('/');
    //     }
    // }, []);

    // usual login
    function loginUser(event){
        event.preventDefault();

        // loading
        setLoginData({
            ...loginData,
            isSubmitting: true,
            errorMessage: null
        }) 

        let isLoggingAsGuest = false;
        doLogin(isLoggingAsGuest);
    }

    // login as guest
    function loginGuestUser(){
        // loading
        let loginGuestData = {
            email:"guest@test.com",
            password:"guest",
            isSubmitting: true,
            errorMessage: null
        }

        setProcessingLoginAsGuest(true);

        let isLoggingAsGuest = true;
        doLogin(isLoggingAsGuest, loginGuestData);
    }

    // common function for login
    async function doLogin(isLoggingAsGuest, loginGuestData){

        // make a request and dispatch
        try{
            let loginFormData = {}
            if(isLoggingAsGuest){
                loginFormData = loginGuestData
            }
            else{
                loginFormData = {...loginData}
            }

            const response = await axios.post("https://kvell-app.herokuapp.com/login", loginFormData);
            // const response = await axios.post("http://localhost:4000/login", loginData);

            if(response.data.success){
                let userData = {
                    name: response.data.user.name,
                    username: response.data.user.username,
                    id: response.data.user._id,
                    token: response.data.token,
                    avatarUrl: response.data.user.avatarUrl
                }

                authDispatch(LOGIN(userData));

                // store in local
                setUserId(userData.id);
                setName(userData.name);
                setUsername(userData.username);
                setToken(userData.token);
                setUserAvatar(userData.avatarUrl ? userData.avatarUrl : null );

                // reset form
                // resetFormState(isLoggingAsGuest);

                toast.info(`Welcome back, ${response.data.user.name}!`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                navigate('/');
            }
            else{
                console.log('response unsuccessful: ', response.message);

                // reset form
                resetFormState(isLoggingAsGuest);

                toast.error(`Error: ${response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }

        }
        catch(error){
            console.log('Error login: ', error.response ? error.response.data.message: error);

            // finish loading
            resetFormState(isLoggingAsGuest);

            if(error.response){
                toast.error(`Error: ${error.response.data.message}`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
            else{
                toast.error(`There was an error during login.`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    }

    function resetFormState(isLoggingAsGuest){
        // console.log('while reset: ', isLoggingAsGuest);
        if(isLoggingAsGuest){
            setProcessingLoginAsGuest(false);
        }
        else{
            // finish loading
            setLoginData({
                ...loginData,
                isSubmitting: false,
            })
        }
    }

    function handleInputChange(event){
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <LoginSection className="shadow-sm grid grid-cols-12 gap-6">
            <div  className="col-span-12 md:col-span-6 p-4">
                <AppName className="flex items-center mb-4 tracking-wide text-lg">
                    <img src={logo} alt="Kvell" className="h-4" />
                    Kvell
                </AppName>

                <h3 className="text-2xl font-bold mb-1 text-gray-500">Login</h3>
                <p className="text-xs text-gray-400 mb-6">Login to use all features of app. You can use your account or use a guest account</p>

                <form onSubmit={loginUser}>
                    <label className="flex flex-col mb-4 text-sm text-gray-400 mb1">
                        Email
                        <input inputMode={"email"} type="email" id="user_email" name="email" value={loginData.email} onChange={handleInputChange}
                                autoComplete="true" placeholder="abc@example.com" className="" required/>    
                    </label>

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
                        

                    <Button type="submit" disabled={loginData.isSubmitting} variant="contained" className="btn-primary w-full">
                        {
                            loginData.isSubmitting ? 
                            <span className="flex items-center">
                                <ImSpinner8 className="loading-icon mr-2"/> Please Wait
                            </span> 
                            : "Login"} 
                    </Button>

                    <span className="mt-2 mb-2 block text-center text-gray-400">OR</span>

                    <Button variant="outlined" onClick={loginGuestUser} disabled={processingLoginAsGuest} className="btn-primary w-full">
                        { 
                            processingLoginAsGuest ? 
                            <span className="flex items-center">
                                <ImSpinner8 className="loading-icon mr-2"/> Please wait
                            </span>
                            :
                            'Login as Guest'
                        }
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    Not a member?
                    <Link to="/signup" className="ml-1">
                        Signup
                    </Link>
                </p>

            </div>

            <div className="col-span-12 md:col-span-6">
                <FeatureSlider />
            </div>
        </LoginSection>
    )
}
