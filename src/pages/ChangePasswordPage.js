import Form from 'react-bootstrap/Form'
import Body from '../components/Body'
import InputField from '../components/InputField';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useApi } from '../contexts/ApiProvider';
import { useFlash } from '../contexts/FlashProvider';

export default function ChangePasswordPage() {
	const [formErrors, setFormErrors] = useState({})
	const oldPasswordField = useRef()
	const passwordField = useRef()
	const password2Field = useRef()
	const api = useApi()
	const navigate = useNavigate()
	const flash = useFlash()

	useEffect(() => {
		oldPasswordField.current.focus()
	}, [])

	const onSubmit = async (ev) => {
		ev.preventDefault();
		if (passwordField.current.value !== password2Field.current.value) {
			setFormErrors({ password2: 'Passwords do not match' })
		}else{
			const response = await api.put('/me', {
				old_password: oldPasswordField.current.value,
				password: passwordField.current.value
			})
			if (response.ok){
				setFormErrors({})
				flash('Your password was changed successfully.', 'success')
				navigate('/')
			}
			else{
				setFormErrors(response.body.errors.json)
			}
		}
	}
	return (
		<Body sidebar>
			<h1>Change Your Password</h1>
			<Form onSubmit={onSubmit}>
				<InputField name='oldPassword' fieldRef={oldPasswordField} label='Old Password' type='password' error={formErrors.old_password} />
				<InputField name='password' fieldRef={passwordField} label='Password' type='password' error={formErrors.password} />
				<InputField name='password2' fieldRef={password2Field} label='Password Again' type='password' error={formErrors.password2} />
				<Button variant='primary' type='submit'>Change Password</Button>
			</Form>
		</Body>
	)
}