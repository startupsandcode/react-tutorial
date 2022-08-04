import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useUser } from '../contexts/UserProvider'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import { NavLink } from 'react-router-dom'

export default function Header() {
	const { user, logout } = useUser()
	return (
		<Navbar bg='light' className='Header' sticky='top'>
			<Container>
				<Navbar.Brand>Microblog</Navbar.Brand>
				<Nav>
					<div className='justify-content-end'>
						{user === undefined ? (
							<Spinner animation='border' />
						) : (
							<>
								{user !== null && (
									<NavDropdown
										title={
											<Image
												src={user.avatar_url + '&s=32'}
												roundedCircle
												align="end"
											/>
										}
									>
										<NavDropdown.Item as={NavLink} to={'/user/'+ user.username}>
											Profile
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item onClick={logout}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								)}
							</>
						)}
					</div>
				</Nav>
			</Container>
		</Navbar>
	)
}
