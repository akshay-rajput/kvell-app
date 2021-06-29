import React from "react";
import Home from "./screens/Home";

// import Search from "./screens/Search";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
// import Profile from "./screens/Profile";
// import About from "./screens/About";
// import BugReport from './screens/BugReport';
// import Acknowledgements from "./screens/Acknowledgements";
// import PageNotFound from './screens/PageNotFound';

import {useRoutes, Navigate} from 'react-router-dom';

const ROUTES = (isAuthenticated) => [
    {
        path: "/",
        key: "Home",
        end: true,
        exact: true,
        element: isAuthenticated ? <Home /> : <Navigate to="/login" /> 
    },
    {
        path: "/login",
        key: "Login",
        end: true,
        element: isAuthenticated ? <Navigate to="/" /> : <Login/>, 
    },
    {
        path: "/signup",
        key: "Signup",
        end: true,
        element: isAuthenticated ? <Navigate to="/" /> : <Signup/>, 
    },
    // {
    //     path: "/video/:videoId",
    //     key: "Video",
    //     element: <Video/>, 
    // },
    
    // playlist routes - order matters
    // {   path: '/playlists/savedVideos',
    //     key: "savedVideos",
    //     end: true,
    //     exact: true,
    //     element: <SavedVideos />
    // },
    // {
    //     path: "/playlists",
    //     key: "Playlists",
    //     end: true,
    //     exact: true,
    //     element: <Playlists/>,
    // },
    // {
    //     path: "/playlists/:playlistId",
    //     key: "UserPlaylist",
    //     end: false,
    //     exact: false,
    //     element: <UserPlaylist/>,
    // },

    // {
    //     path: "/search",
    //     key: "Search",
    //     element: <Search/>, 
    // },
    
    
    // {
    //     path: "/profile",
    //     key: "Profile",
    //     element: <Profile/>, 
    // },
    // {
    //     path: "/about",
    //     key: "About",
    //     element: <About/>, 
    // },
    // {
    //     path: "/acknowledgements",
    //     key: "Acknowledgements",
    //     element: <Acknowledgements/>, 
    // },
    // {
    //     path: "/bugreport",
    //     key: "BugReport",
    //     element: <BugReport/>, 
    // },
    // {
    //     path: "*",
    //     key: "PageNotFound",
    //     element: <PageNotFound/>, 
    // },  
];

export function RenderRoutes({ userLoggedIn, routes }) {
    // useRoutes to render routes object - alternative to Routes & Route of react-router-dom
    let selectedRoute = useRoutes(ROUTES(userLoggedIn));
    // console.log('select: ', selectedRoute);
    return selectedRoute;
}


export default ROUTES;

