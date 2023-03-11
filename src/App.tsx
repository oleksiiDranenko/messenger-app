//styles
import './App.css';
//react router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages
import { SignUpPage } from './pages/signup-page/SignUpPage';
import { HomePage } from './pages/home-page/HomePage';
import { ProfilePage } from './pages/profile-page/ProfilePage';
//hooks
import { useUser } from './hooks/useUser';
//redux
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
	//getting the user
    const user = useUser();

	return (
    	<div className="App">
			<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={
						user ? <HomePage/> 
						: <SignUpPage/>}
					/>
					<Route path='/profile' element={<ProfilePage/>}/>
				</Routes>
			</BrowserRouter>
			</Provider>
    	</div>
  	);
}

export default App;
