import React, {useState} from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import {ImSpinner8} from 'react-icons/im';

import nodataImage from '/nodata.svg';
import {getUrl} from '@/utils/api.config';
// import { useLocation } from 'react-router-dom';
import PostCard from '@/features/posts/PostCard';
import UserCard from '../features/search/UserCard';

import axios from 'axios';
import { toast } from 'react-toastify';
import { nanoid } from '@reduxjs/toolkit';

const SearchBar = styled.div`
    {
        input{
            border-radius: var(--border-radius) 0 0 var(--border-radius);
        }
        button{
            color: var(--primary);
            background: var(--primary-light);
            font-size: 1.5rem;
            padding: 0.5rem;
            border: 1px solid var(--primary-light);
            border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }
    }
`;

export default function Search() {
    const initialState = {
        loading: false,
        error: null,
        query: ''
    }
    const initialResults = {
        users: [],
        posts: []
    }

    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState(initialResults);
    const [searchState, setSearchState] = useState(initialState)

    async function doSearch(event){
        event.preventDefault();

        setSearchState({
            ...searchState,
            loading: true
        })

        console.log("searching.. ", searchQuery);
        try{
            // const response = await axios.get(`https://kvell-app.herokuapp.com/search?q=${searchQuery}`);
            const response = await axios.get(getUrl("search", {})+`?q=${searchQuery}`);
            console.log('response of search: ', response);
            
            let postsResults = response.data.posts;
            let usersResults = response.data.users;
            
            if(postsResults.length > 0 || usersResults.length > 0){
                setResults(prevData => (
                    {
                        ...prevData,
                        users: usersResults,
                        posts: postsResults
                    }
                ));

                setSearchState({
                    ...searchState,
                    loading: false,
                    error: null,
                    query: response.data.queryPassed
                })
            }
            else{
                // reset results
                setResults(initialResults);

                setSearchState({
                    ...searchState,
                    loading: false,
                    error: response.data.message
                })
            }
        }
        catch(error){
            console.log('error in search: ', error);
        
            setSearchState({
                ...searchState,
                error: error.message,
                loading: false
            })
        }
    }
    function handleInput(event){
        setSearchQuery(event.target.value);

        // reset results
        setResults(initialResults);

        // reset any errors if input empty
        if(event.target.value == ''){
            setSearchState({
                ...searchState,
                error: null,
                loading:false
            })
        }
    }

    function handleInputChange(event){
        // user typing something, clear errors
        setSearchState({
            ...searchState,
            error: null
        })

        // if input cleared
        if(event.target.value === "" || results.users.length > 0 || results.posts.length > 0){
            setResults(initialResults);
        }

        setSearchQuery(event.target.value);
    }

    return (
        <div className="flex flex-col w-full">
            <SearchBar className="mx-auto">
                <form className="flex items-center" onSubmit={doSearch}>
                    <input inputMode={"search"} type="search" placeholder="Search.." onChange={handleInputChange} value={searchQuery} required />
                    <button type="submit">
                        {
                            searchState.loading ? 
                            <ImSpinner8 className="loading-icon" />
                            :
                            <MdSearch className=""/>
                        }
                    </button>
                </form>
            </SearchBar>

            <div className="">
                {   searchState.error && searchQuery !== "" &&
                    <div className="flex flex-col justify-center items-center mt-8 p-8">
                        <img src={nodataImage} alt="No data" className={`w-32 mt-4`} />

                        <div className="mt-6 text-center">
                            <h4 className="text-gray-400 text-md mb-2">No Results Found</h4>
                            <span className="text-gray-400 text-sm">We couldn't find any users or posts based on your search</span>
                        </div>
                    </div>
                }

                {
                    searchQuery == '' && 
                    <div className="flex flex-col text-center mt-8 md:mt-20 p-8">
                        <span className="text-4xl text-gray-300">◔_◔</span>
                        <span className="mt-4 text-gray-400">Enter some text above to search for users or posts</span>
                    </div>
                }

                {
                    searchQuery !== '' && results.users.length > 0 || results.posts.length > 0 ?
                    <div className="">
                        <h4 className=" mb-4 text-gray-400 font-normal">Showing <strong>{results.users.length + results.posts.length}</strong> results for {searchQuery}</h4> 
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {
                                results.users.length > 0 && results.users.map(user => {
                                    return(
                                        <div key={nanoid()} className="">
                                            <UserCard user={user} />
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {
                                results.posts.length > 0 && results.posts.map(post => {
                                    return(
                                        <div key={nanoid()} className="">
                                            <PostCard post={post}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                    :
                    null
                }

            </div>
        </div>
    )
}
