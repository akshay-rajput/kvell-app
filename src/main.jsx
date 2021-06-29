import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

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
