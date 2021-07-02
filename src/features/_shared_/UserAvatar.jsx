import React from 'react';
import {MdPerson} from 'react-icons/md';
import styled from 'styled-components';

const Avatar = styled.div`
    border-radius: 50%;
    padding: 1px;
    border: 2px solid white;
    width: ${props => props.avatarSize == "large" ? "6rem": props.avatarSize == "medium" ? "3rem": "2rem"};

    img{
        border-radius: 50%;
        width: 100%;
    }
`;

export default function UserAvatar({avatarUrl, avatarSize}) {

    return (
        <Avatar avatarSize={avatarSize}>
            <img src={avatarUrl ? avatarUrl : "https://nitreo.com/img/igDefaultProfilePic.png"} alt="user" className="" />
                    
        </Avatar>
    )
}
