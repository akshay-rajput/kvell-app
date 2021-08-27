import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import useWindowDimensions from "@/hooks/useWindowDimensions";

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
    const [optimizedImage, setOptimizedImage] = useState("");

    const {width, height} = useWindowDimensions();

    useEffect(() => {
        let rem = 16;
        if(width < 768){
            rem = 14;
        }

        if(avatarUrl){
            let position = avatarUrl.indexOf("upload") + 7;
            let dynamic_width = `w_${avatarSize == "large" ? 8*rem: 5*rem},c_scale/`;
            let opt_img_url = avatarUrl.substring(0, position) + dynamic_width + avatarUrl.substring(position);

            setOptimizedImage(opt_img_url);
        }
        else{
            setOptimizedImage("https://nitreo.com/img/igDefaultProfilePic.png");
        }
        
    }, [avatarUrl]);


    return (
        <Avatar avatarSize={avatarSize} aria-label="User avatar">
            {/* <img loading="lazy" src={avatarUrl ? avatarUrl : "https://nitreo.com/img/igDefaultProfilePic.png"} alt="user" className="" /> */}
            <img loading="lazy" src={optimizedImage} alt="user" className="" />
                    
        </Avatar>
    )
}
