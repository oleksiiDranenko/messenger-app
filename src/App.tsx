//styles
import './App.css';
//react router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages
import { SignUpPage } from './pages/signup-page/SignUpPage';
import { HomePage } from './pages/home-page/HomePage';
import { ProfilePage } from './pages/profile-page/ProfilePage';
import { MessagesSection } from './pages/home-page/components/messages-section/MessagesSection';
import { Sidebar } from './pages/home-page/components/sidebar/Sidebar';
//hooks
import { useUser } from './hooks/useUser';
//redux
import { store } from './store/store';
import { Provider } from 'react-redux';
//react responsive
import { useMediaQuery } from 'react-responsive';

function App() {
	//getting the user
    const user = useUser();
	//screen width
	const noSidebarScreenSize = useMediaQuery({query: '(max-width: 768px)'})

	return (
    	<div className="App">
			<Provider store={store}>
			<BrowserRouter>
				{!noSidebarScreenSize ? 
				<Routes>
					<Route path='/' element={
						user ? <HomePage/> 
						: <SignUpPage/>}
					/>
					<Route path='/profile' element={<ProfilePage/>}/>
				</Routes>
				: 
				<Routes>
					<Route path='/' element={
						user ? <Sidebar/> 
						: <SignUpPage/>}
					/>
					<Route path='/messages' element={<MessagesSection/>}/>
					<Route path='/profile' element={<ProfilePage/>}/>
				</Routes>
				}
			</BrowserRouter>
			</Provider>
    	</div>
  	);
}

export default App;
