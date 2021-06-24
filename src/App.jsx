import React, { useState } from 'react'
// import logo from './logo.svg'
import './tailwind.css';
import './App.css';
import styled from 'styled-components';

const Title = styled.h1`
	font-size: 2.5rem;
	text-align: center;
	color: slateblue;
`;

function App() {
	return (
		<div className="App ">
			<Title className="tracking-wide p-2 m-2">Kvell App</Title>
		</div>
	)
}

export default App;
