import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
export default function Header() {
	return (
		<Navbar bg='light' className='Header' sticky='top'>
			<Container>
				<Navbar.Brand>Microblog</Navbar.Brand>
			</Container>
		</Navbar>
	)
}