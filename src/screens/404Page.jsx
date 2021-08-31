import React from 'react';
import errorImage from '/pageBurnt.png';
import {Link, useNavigate} from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <>
            <div className="text-gray-500 w-full flex flex-col items-center justify-center py-8">
                <div className="flex flex-col items-center text-center mb-6">
                    <img loading="lazy" src={errorImage} alt="Page not found" className="w-32" />
                    <h3 className="text-xl mt-4">Page not found!</h3>
                    <span className="text-sm py-1">This page is burnt to a crisp!</span>
                </div>
                <button className="border border-purple-400 bg-purple-100 hover:bg-purple-600 hover:text-white text-purple-900 px-6 py-2 rounded-md" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </>
    )
}
