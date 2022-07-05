import Container from 'react-bootstrap/Container'
import Header from './components/Header'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import ExplorePage from './pages/ExplorePage'
import LoginPage from './pages/LoginPage'
import UserPage from './pages/UserPage'
export default function App() {
	return (
		<Container fluid className='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<FeedPage />} />
					<Route path='/explore' element={<ExplorePage />} />
					<Route path='/user/:username' element={<UserPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='*' element={ <Navigate to='/' /> } />
				</Routes>
			</BrowserRouter>
		</Container>
	)
}
