import {useState, useEffect, useRef } from 'react';
import { useApi } from '../contexts/ApiProvider';
import { useUser } from '../contexts/UserProvider';
import Stack from 'react-bootstrap/Stack';
import InputField from './InputField';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

export default function Write({ showPost }){
	const [formErrors, setFormErrors] = useState({})
	const textField = useRef()
	const api = useApi()
	const { user } = useUser()

	useEffect(() => {
		textField.current.focus()
	}, [])

	const onSubmit = async (ev) => {
		ev.preventDefault();
		if (textField.current.value.length < 1) {
			setFormErrors({ text: 'Please enter some text' })
		}else{
			const response = await api.post('/posts', {
				text: textField.current.value,
			})
			if (response.ok){
				showPost(response.body)
				textField.current.value = ''
			}
		}
	}

	return (
		<Stack direction="horizontal" gap={3} className="Write">
			<Image src={user.avatar_url + '&s=64'} roundedCircle />
			<Form onSubmit={onSubmit}>
				<InputField name='text' fieldRef={textField} placeholder="What's on your mind?" type='text' error={formErrors.text} />
			</Form>
		</Stack>
	)
}