import { useEffect, useRef, useState } from 'react';

import { useApi } from '../contexts/ApiProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFlash } from '../contexts/FlashProvider';

import Body from '../components/Body';
import InputField from '../components/InputField';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ResetPage() {
	const [formErrors, setFormErrors] = useState({});
	const passwordField = useRef();
	const password2Field = useRef();
	const navigate = useNavigate();
	const { search } = useLocation();
	const api = useApi();
	const flash = useFlash();
	const token = new URLSearchParams(search).get('token');

	useEffect(() => {
		if (!token) {
			navigate('/');
		}else{
			passwordField.current.focus();
		}
	}, [token,navigate])

	const onSubmit = async (ev) => {
		ev.preventDefault();
		if (passwordField.current.value !== password2Field.current.value) {
			setFormErrors({ password2: 'Passwords do not match' });
		}else{
			const response = await api.put('/tokens/reset', {
				token,
				new_password: passwordField.current.value
			})
			if (response.ok){
				setFormErrors({});
				flash('Your password was changed successfully.', 'success');
				navigate('/login');
			}
		}
	}

	return (
		<Body>
			<h1>Reset Password</h1>
			<Form onSubmit={onSubmit}>
				<InputField
					name='password'
					label='Password'
					type='password'
					error={formErrors.password}
					fieldRef={passwordField}
				/>
				<InputField
					name='password2'
					label='Password Again'
					type='password'
					error={formErrors.password2}
					fieldRef={password2Field}
				/>
				<Button variant='primary' type='submit'>
					Reset Password
				</Button>
			</Form>
		</Body>
	)
}
