import React from 'react';
import './App.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUpPage } from './pages/signup-page/SignUpPage';
import { HomePage } from './pages/home-page/HomePage';
import { ProfilePage } from './pages/profile-page/ProfilePage';

function App() {
	//getting the user
    const [user, loading] = useAuthState(auth);

	return (
    	<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' element={
						user ? <HomePage/> : 
						loading ? <p>loading...</p> 
						: <SignUpPage/>}
					/>
					<Route path='/profile' element={<ProfilePage/>}/>
				</Routes>
			</BrowserRouter>
    	</div>
  	);
}

export default App;
