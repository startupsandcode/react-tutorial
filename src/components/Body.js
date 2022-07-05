import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Sidebar from './Sidebar'
export default function Body({ sidebar, children }) {
	return (
		<Container>
			<Stack direction='horizontal'>
				{ sidebar && <Sidebar /> }
				<Container>
					{children}
				</Container>
			</Stack>
		</Container>
	)
}
