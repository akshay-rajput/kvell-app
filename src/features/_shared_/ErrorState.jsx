import React from 'react';
import styled from 'styled-components';

const ErrorAlert = styled.div`
    display:flex;
    flex-direction: column;

    .error-emote{
        font-size: 3rem;
    }
`;

export default function ErrorState() {
    return (
        <ErrorAlert className="items-center justify-center mt-24">
            <span className="error-emote text-gray-300">{`( •_•)>`}</span>
            <span className="text-gray-400 text-sm text-center mt-2 leading-6">Oops! Something went wrong. <br /> Please refresh the page.</span>
        </ErrorAlert>
    )
}
