import Form from 'react-bootstrap/Form'
import Body from '../components/Body'
import InputField from '../components/InputField';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function RegistrationPage() {
	const [formErrors, setFormErrors] = useState({})
	const usernameField = useRef()
	const emailField = useRef()
	const passwordField = useRef()
	const password2Field = useRef()
	const api = useApi()
	const navigate = useNavigate()
	const flash = useFlash()

	useEffect(() => {
		usernameField.current.focus()
	}, [])

	const onSubmit = async (ev) => {
		ev.preventDefault();
		if (passwordField.current.value !== password2Field.current.value) {
			setFormErrors({ password2: 'Passwords do not match' })
		}else{
			const data = await api.post('/users', {
				username: usernameField.current.value,
				email: emailField.current.value,
				password: passwordField.current.value
			})
			if (!data.ok) {
				setFormErrors(data.body.errors.json)
			}else{
				setFormErrors({})
				navigate('/login')
				flash('Your registration was successful. Please login.', 'success')
			}
		}
	}
	return (
		<Body>
			<h1>Register</h1>
			<Form onSubmit={onSubmit}>
				<InputField name='username' fieldRef={usernameField} label='Username' type='text' error={formErrors.username} />
				<InputField name='email' fieldRef={emailField} label='Email' type='email' error={formErrors.email} />
				<InputField name='password' fieldRef={passwordField} label='Password' type='password' error={formErrors.password} />
				<InputField name='password2' fieldRef={password2Field} label='Password Again' type='password' error={formErrors.password2} />
				<Button variant='primary' type='submit'>Register</Button>
			</Form>
		</Body>
	)
}