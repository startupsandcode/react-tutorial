import Container from 'react-bootstrap/Container'
import Header from './components/Header'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FeedPage from './pages/FeedPage'
import ExplorePage from './pages/ExplorePage'
import LoginPage from './pages/LoginPage'
import UserPage from './pages/UserPage'
import RegistrationPage from './pages/RegistrationPage'
import EditUserPage from './pages/EditUserPage'
import ApiProvider from './contexts/ApiProvider'
import FlashProvider from './contexts/FlashProvider'
import UserProvider from './contexts/UserProvider'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
	return (
		<Container fluid className='App'>
			<BrowserRouter>
				<FlashProvider>
					<ApiProvider>
						<UserProvider>
							<Header />
							<Routes>
								<Route
									path='/login'
									element={
										<PublicRoute>
											<LoginPage />
										</PublicRoute>
									}
								/>
								<Route
									path='/register'
									element={
										<PublicRoute>
											<RegistrationPage />
										</PublicRoute>
									}
								/>
								<Route
									path='*'
									element={
										<PrivateRoute>
											<Routes>
												<Route
													path='/'
													element={<FeedPage />}
												/>
												<Route
													path='/explore'
													element={<ExplorePage />}
												/>
												<Route
													path='/user/:username'
													element={<UserPage />}
												/>
												<Route
													path='/edit'
													element={<EditUserPage />}
												/>
												<Route
													path='*'
													element={
														<Navigate to='/' />
													}
												/>
											</Routes>
										</PrivateRoute>
									}
								/>
							</Routes>
						</UserProvider>
					</ApiProvider>
				</FlashProvider>
			</BrowserRouter>
		</Container>
	)
}
