import { Alert } from 'react-bootstrap'
import { FlashContext } from '../contexts/FlashProvider'
import { useContext } from 'react'
import Collapse from 'react-bootstrap/Collapse'

export default function FlashMessage() {
	const { flashMessage, visible, hideFlash } = useContext(FlashContext)

	return (
		<Collapse in={visible}>
			<div>
				<Alert variant={flashMessage.type || 'info'} dismissible onClose={hideFlash}>
					{flashMessage.message}
				</Alert>
			</div>
		</Collapse>
	)
}
