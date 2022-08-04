import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Body from '../components/Body';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useApi } from '../contexts/ApiProvider';
import { useUser } from '../contexts/UserProvider';
import { useFlash } from '../contexts/FlashProvider';
import InputField from '../components/InputField';

export default function EditUserPage() {
	const [formErrors, setFormErrors] = useState({});
	const usernameField = useRef();
	const emailField = useRef();
	const aboutMeField = useRef();
	const api = useApi();
	const { user, setUser } = useUser();
	const flash = useFlash();
	const navigate = useNavigate();
	
	useEffect(() => {
		usernameField.current.focus();
		usernameField.current.value = user.username;
		emailField.current.value = user.email;
		aboutMeField.current.value = user.about_me;
	}, [user]);

	const onSubmit = async (ev) => {
		ev.preventDefault();
		const response = await api.put('/me', {
			username: usernameField.current.value,
			email: emailField.current.value,
			about_me: aboutMeField.current.value
		})
		if (response.ok) {
			setFormErrors({})
			setUser(response.body)
			flash('Your profile was updated successfully.', 'success')
			navigate('/user/' + response.body.username)
		}
		else{
			setFormErrors(response.body.errors.json)
		}
	}

	return (
		<Body sidebar>
			<Form onSubmit={onSubmit}>
				<InputField name='username' fieldRef={usernameField} label='Username' type='text' error={formErrors.username} />
				<InputField name='email' fieldRef={emailField} label='Email' type='email' error={formErrors.email} />
				<InputField name='aboutMe' fieldRef={aboutMeField} label='About Me' type='text' error={formErrors.aboutMe} />
				<Button variant='primary' type='submit'>Save</Button>
			</Form>
		</Body>
	)
}
