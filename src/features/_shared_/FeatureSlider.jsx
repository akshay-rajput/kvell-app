import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import styled from 'styled-components';

const FeatureContainer = styled.div`
    background-image: radial-gradient(circle at 91% 26%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 27% 63%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 59% 48%, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.01) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 58% 65%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 55% 21%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 3%,transparent 3%, transparent 100%),radial-gradient(circle at 88% 4%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 9% 23%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 40% 78%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 78% 5%, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 11% 87%, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.01) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 11% 24%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 18% 75%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 71% 80%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 7%,transparent 7%, transparent 100%),radial-gradient(circle at 34% 79%, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.01) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 9% 51%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 46% 69%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 54% 90%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 55% 58%, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.01) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 95% 37%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 5%,transparent 5%, transparent 100%),radial-gradient(circle at 9% 4%, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 5%,transparent 5%, transparent 100%),linear-gradient(135deg, rgb(249, 93, 202),rgb(11, 13, 179));
    color: white;
    border-radius: 0 0 var(--border-radius) var(--border-radius); 
    padding: 1rem;
    height: 100%;
    min-height: 300px;

    @media(min-width: 768px){
        border-radius: 0 var(--border-radius) var(--border-radius) 0; 
    }
`;

const features = [
    {
        title: "A place for people to express who they are",
        info: "We empower people to tell their story and connect with others."
    },
    {
        title: "A place to share",
        info: "Top contributors are given a special mention."
    },
    {
        title: "And much more",
        info: "Sign up now to access all features of the app."
    }
]

export default function FeatureSlider() {
    return (
        <FeatureContainer className="flex flex-col items-center justify-center">
            <Swiper spaceBetween={50}
				slidesPerView={1}
                autoplay={true}
				pagination={{ clickable: true }}
	  		>
                {
                    features.map(feature => {
                        return(
                            <SwiperSlide key={feature.title} className="text-center p-4 rounded w-full mb-4 mt-4">
                                <h3 className="mb-1 text-lg">{feature.title}</h3>
                                <p className="text-sm">{feature.info}</p>
                            </SwiperSlide>
                        )
                    })
                }
                    
            </Swiper>
            
        </FeatureContainer>    
    )
}
