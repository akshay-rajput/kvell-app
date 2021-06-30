import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import axios from "axios";
import store from './store';
import {LOGOUT} from '@/features/authentication/authenticationSlice';
import App from './App';

axios.interceptors.request.use(function(config) {
		const token = JSON.parse(localStorage.getItem('token'));

		if(token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	}, 
	function(err) {
		console.log('general request rejected', err.response.status)
		return Promise.reject(err);
	}
);

axios.interceptors.response.use(
	(response) => response,
	(error) => {
	  	if (error?.response?.status === 401) {
			//   console.log("unauthorized route")
			// dispatch to change state as well
			store.dispatch(LOGOUT());
		}
	  	return Promise.reject(error);
	}
);


ReactDOM.render(
	<React.StrictMode>
		
		<BrowserRouter>
			<Provider store={store}>
				{/* <PlaylistsProvider> */}
				<App />
				{/* </PlaylistsProvider>       */}
			</Provider>
		</BrowserRouter>

	</React.StrictMode>,
  	document.getElementById('root')
)
