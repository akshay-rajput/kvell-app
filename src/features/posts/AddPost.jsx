import React, {useEffect} from 'react';

export default function AddPost() {
    useEffect(() => {
        console.log('mounted add post..');
        
    }, []);


    return (
        <div className="border border-gray-400 rounded">
            Post will be added here
            
        </div>

    )
}
