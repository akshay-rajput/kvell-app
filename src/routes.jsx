import React from "react";
import Home from "@/screens/Home";

import Search from "@/screens/Search";
import Login from "@/screens/Login";
import Signup from "@/screens/Signup";
import Profile from "@/screens/Profile";
import PostDetail from "@/screens/PostPage";
import AddPost from "@/features/posts/AddPost";
import EditProfile from "@/features/profile/EditProfile";
import Notifications from "@/screens/Notifications";
// import BugReport from '@/screens/BugReport';
// import Acknowledgements from "@/screens/Acknowledgements";
// import PageNotFound from '@/screens/PageNotFound';

import {useRoutes, Navigate} from 'react-router-dom';

const ROUTES = () => [
    {
        path: "/addpost",
        key: "AddPost",
        end: true,
        element: <AddPost />
    },
    {
        path: "/posts/:postId",
        key: "PostPage",
        element: <PostDetail />
    },
    {
        path: "/profile/edit",
        key: "EditProfile",
        end: true,
        element: <EditProfile />
    },
    {
        path: "/profile/:userId",
        key: "Profile",
        end: true,
        element: <Profile />
        // element: isAuthenticated ? <Profile /> : <Navigate to="/login" />
    },
    {
        path: "/search",
        key: "Search",
        end: true,
        // element: isAuthenticated ? <Search /> : <Navigate to="/login" />
        element: <Search />
    },
    {
        path: "/notifications",
        key: "Notifications",
        end: true,
        // element: isAuthenticated ? <Search /> : <Navigate to="/login" />
        element: <Notifications />
    },
    {
        path: "/login",
        key: "Login",
        end: true,
        element: <Login/>,
        // element: isAuthenticated ? <Navigate to="/" /> : <Login/>,
    },
    {
        path: "/signup",
        key: "Signup",
        end: true,
        element: <Signup/>,
        // element: isAuthenticated ? <Navigate to="/" /> : <Signup/>, 
    },
    
    {
        path: "/",
        key: "Home",
        end: true,
        element: <Home />
        // element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
        // children: [
        //     { path: '/addpost', element: <AddPost /> },
        //     { path: ':id', element: <UserProfile /> },
        //     { path: 'me', element: <OwnUserProfile /> },
        // ]
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

export function RenderRoutes() {
    // useRoutes to render routes object - alternative to Routes & Route of react-router-dom
    let selectedRoute = useRoutes(ROUTES());
    // console.log('select: ', selectedRoute);
    return selectedRoute;
}


export default ROUTES;

