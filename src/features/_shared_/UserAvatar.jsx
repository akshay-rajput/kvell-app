import React from 'react';
import styled from 'styled-components';

const Avatar = styled.div`
    border-radius: 50%;
    padding: 1px;
    border: 2px solid white;
    width: ${props => props.avatarSize == "large" ? "6rem": props.avatarSize == "medium" ? "3rem": "2rem"} !important;
    height: ${props => props.avatarSize == "large" ? "6rem": props.avatarSize == "medium" ? "3rem": "2rem"} !important;

    img{
        border-radius: 50%;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
    }
`;

export default function UserAvatar({avatarUrl, avatarSize}) {

    return (
        <Avatar avatarSize={avatarSize}>
            <img src={avatarUrl ? avatarUrl : "https://nitreo.com/img/igDefaultProfilePic.png"} alt="user" className="" />
                    
        </Avatar>
    )
}
