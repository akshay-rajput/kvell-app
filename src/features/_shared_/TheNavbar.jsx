import React, {useState, useRef, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { useSelector} from "react-redux";

import { MdHome, MdSearch, MdAddCircleOutline, MdNotificationsNone, MdPersonOutline } from 'react-icons/md';
import {GiAzulFlake} from "react-icons/gi";
import {HiOutlineHome} from "react-icons/hi";
import styled from 'styled-components';

const AppNavbar = styled.nav`
    {
        color: var(--dark);
        border-bottom: 1px solid var(--primary-light);

        ul li a{
            padding: 0.25rem;
            border-radius: 50%;
            background: var(--light);
            font-size: 1.75rem;
        }
        ul li a.active{
            background: var(--primary-light);
        }

        ul li a.profile-pic{
            img{
                width: 2rem;
                height: 2rem;
                object-fit: cover;
                border: 1px solid var(--primary-light);
                border-radius: 50%;
            }
        }

        @media(max-width: 480px){
            position:fixed;
            bottom: 0;
            width: 100%;
            z-index: 4;
            background: var(--light);
            border-bottom: none;
            border-top: 1px solid var(--primary-light); 
            box-shadow: 0px 0px 4px rgba(0,0,0,0.10);
            ul li a{
                font-size: 2rem;
            }
        }
        
    }
`;

export default function TheNavbar({windowWidth}) {
    const authState = useSelector(state => state.authentication);

    return (
        <AppNavbar className="md:shadow-sm">
            <div className="app-container flex items-center md:justify-between p-2">
                {/* hide on mobile */}
                <NavLink to="/" className="app-navbar-logo hidden md:block">
                    <span className="flex items-center">
                        <GiAzulFlake className="mr-1" />
                        Kvell
                    </span>
                </NavLink>
                <div className="flex items-center flex-grow md:justify-end">
                    <ul className="flex flex-grow md:flex-initial items-center justify-between md:gap-x-4 flex-wrap">
                        <li>
                            <NavLink end to="/" className="flex items-center">
                                <HiOutlineHome className="" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink end to="/search" className="flex items-center">
                                <MdSearch className="" />
                            </NavLink>
                        </li>
                        {
                            windowWidth < 767 ?
                            <li>
                                <NavLink end to="/addpost" className="flex items-center">
                                    <MdAddCircleOutline className="" />
                                </NavLink>
                            </li>
                            :
                            null
                        }
                        <li>
                            <NavLink end to="/notifications" className="flex items-center">
                                <MdNotificationsNone className="" />
                            </NavLink>
                        </li>

                        <li>
                            <NavLink end to={"/profile/"+authState.userId} className="flex items-center profile-pic">
                                {/* <small className="">{JSON.stringify(authState)}</small> */}
                                {
                                    authState.userAvatar ? 
                                    <img src={authState.userAvatar} alt="User" />
                                    :
                                    <MdPersonOutline />
                                }
                            </NavLink>
                        </li>

                    </ul>
                </div>

            </div>        
        </AppNavbar>
    )
}
