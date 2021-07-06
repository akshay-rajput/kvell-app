import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import styled from "styled-components";
import {MdKeyboardArrowLeft} from 'react-icons/md';

const PostDetailPage = styled.div`
    .btn-back{
        color: var(--primary-dark);
        transition: color ease 0.35s;
    
        :hover{
            color: var(--dark);
        }
    }
`;

export default function PostPage() {

    const [postData, setPostData] = useState({});
    const {postId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // fetch post data
        console.log('pid: ', postId);
        
    }, [postId]);

    return (
        <PostDetailPage>
            <div className="">
                <button className="btn-back flex items-center" onClick={()=> navigate(-1)}>
                    <MdKeyboardArrowLeft /> Back
                </button>
            </div>
        </PostDetailPage>
    )
}
