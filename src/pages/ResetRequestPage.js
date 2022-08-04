import {useState, useEffect, useRef} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Body from '../components/Body';
import InputField from '../components/InputField';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider'

export default function ResetRequestPage(){
	const [formErrors, setFormErrors] = useState({});
	const emailField = useRef()
	const api = useApi()
	const flash = useFlash()

	useEffect(() => {
		emailField.current.focus()
	}, [])

	const onSubmit = async (ev) => {
		ev.preventDefault();
		if (emailField.current.value.length < 1) {
			setFormErrors({ email: 'Please enter your email' })
		}else{
			const response = await api.post('/tokens/reset', {
				email: emailField.current.value
			})
			if (!response.ok){
				setFormErrors(response.body.errors.json)
			}else{
				emailField.current.value = '';
				setFormErrors({})
				flash('An email has been sent to you with a link to reset your password.', 'info')
			}
		}
	}

	return (
		<Body>
			<h1>Reset Password</h1>
			<Form onSubmit={onSubmit}>
				<InputField name='email' fieldRef={emailField} label='Email' type='email' error={formErrors.email} />
				<Button variant='primary' type='submit'>Reset Password</Button>
			</Form>
		</Body>
	)
}