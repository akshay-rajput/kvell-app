// import logo from '../public/logo.svg';
import './tailwind.css';
import './App.css';

import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getNotificationsForUser} from '@/features/notifications/notificationSlice';

import { ToastContainer, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// import 'swiper/swiper.scss';
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, {
	Pagination,
	Autoplay
  } from 'swiper/core';
SwiperCore.use([Pagination, Autoplay]);  

// render routes
import ROUTES, {RenderRoutes} from './routes';
import { useNavigate, useLocation } from "react-router-dom";

import useWindowDimensions from "@/hooks/useWindowDimensions";
// components
import TheNavbar from '@/features/_shared_/TheNavbar';
import TheFooter from '@/features/_shared_/TheFooter';

// style
import { createGlobalStyle } from 'styled-components';
import { Button } from '@material-ui/core'

// Create a `GlobalStyles` component to pass variable for styled-components.
const GlobalStyles = createGlobalStyle`
  html {
	--accent: coral;
    --primary: #9146ff;
	--primary-dark: #7313ff;
	--primary-light: #ede0ff;
	--light: #f9f5ff;
	--dark: #292037;
	--black: #121014;

	--card-bg: #fff;
	--border-radius: 0.5rem;
  }
`;

function App() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const authState = useSelector(state => state.authentication);
	const notificationState = useSelector(state => state.notifications);
    const dispatch = useDispatch();

	const {width, height} = useWindowDimensions();
	// const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // scroll to top on load
    // useEffect(() => {
	// 	console.log('pathname: ', pathname);
    //     if(pathname !== "/"){
	// 		window.scrollTo({
	// 			top: 0,
	// 			behavior: "smooth"
	// 		});
	// 	}
    // }, [pathname]);

	// auth
    useEffect(() => {
        // console.log('app token: ', authState.token);
        if(!authState.token){
            navigate('/login');
        }
		else{
			// get notifications for user
			(async () => {
				if(notificationState.status==="Idle"){
					await dispatch(getNotificationsForUser(authState.userId));
				}
			})();
		}
        
    }, [authState.token])


	return (		
		<div className="App">
			<GlobalStyles />

			{
				authState.token && <TheNavbar windowWidth={width} />
			}
			
			<main className="app-container">	
				<RenderRoutes />				
			</main>

			<TheFooter />
			
			<ToastContainer pauseOnHover={false} autoClose={3000} transition={Slide}/>
		</div>
	)
}

export default App;
