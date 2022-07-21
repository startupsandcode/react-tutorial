import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Sidebar from './Sidebar'
export default function Body({ sidebar, children }) {
	return (
		<Container className='Body'>
			<Stack direction='horizontal'>
				{ sidebar && <Sidebar /> }
				<Container className='Content'>
					{children}
				</Container>
			</Stack>
		</Container>
	)
}
