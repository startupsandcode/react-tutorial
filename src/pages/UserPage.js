import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Body from '../components/Body'
import { useApi } from '../contexts/ApiProvider'
import Stack from 'react-bootstrap/Stack'
import Image from 'react-bootstrap/Image'
import TimeAgo from '../components/TimeAgo'
import Spinner from 'react-bootstrap/Spinner'
import Posts from '../components/Posts'
import { useUser } from '../contexts/UserProvider'
import Button from 'react-bootstrap/Button'
import { useFlash } from '../contexts/FlashProvider'


export default function UserPage() {
	const { username } = useParams()
	const [user, setUser] = useState()
	const [isFollower, setIsFollower] = useState()
	const { user: loggedInUser } = useUser()
	const navigate = useNavigate()
	const flash = useFlash()
	const api = useApi()

	useEffect(() => {
		(async () => {
			const response = await api.get(`/users/${username}`)
			if (response.ok) {
				setUser(response.body)
				if (response.body.username !== loggedInUser.username) {
					const follower = await api.get(
						'/me/following/' + response.body.id,
					)
					if (follower.status === 204) {
						setIsFollower(true)
					} else if (follower.status === 404) {
						setIsFollower(false)
					}
				} else {
					setIsFollower(null)
				}
			} else {
				setUser(null)
			}
		})()
	}, [api, username, loggedInUser])

	const edit = () => {
		navigate('/edit')
	}
	const follow = async () => {
		const response = await api.post('/me/following/' + user.id)
		if (response.ok) {
			flash(<>
				You are now following <b>{user.username}</b>
			</>, 'success')
			setIsFollower(true)
		}
	}
	const unfollow = async () => {
		const response = await api.delete('/me/following/' + user.id)
		if (response.ok) {
			flash(<>
				You have unfollowed <b>{user.username}</b>
			</>, 'success')
			setIsFollower(false)
		}
	}

	return (
		<Body sidebar>
			{user === undefined ? (
				<Spinner animation='border' />
			) : (
				<>
					{user === null ? (
						<p>User not found.</p>
					) : (
						<>
							<Stack direction='horizontal' gap={4}>
								<Image
									src={user.avatar_url + '&s=128'}
									roundedCircle
									alt={user.username}
								/>
								<div>
									<h1>{user.username}</h1>
									{user.about_me && <h5>{user.about_me}</h5>}
									<p>
										Member since:{' '}
										<TimeAgo isoDate={user.first_seen} />
										<br />
										Last seen:{' '}
										<TimeAgo isoDate={user.last_seen} />
									</p>
									{isFollower === null && (
										<Button
											variant='primary'
											onClick={edit}
										>
											Edit
										</Button>
									)}
									{isFollower === false && (
										<Button
											variant='primary'
											onClick={follow}
										>
											Follow
										</Button>
									)}

									{isFollower === true && (
										<Button
											variant='primary'
											onClick={unfollow}
										>
											unfollow
										</Button>
									)}
								</div>
							</Stack>
							<Posts content={user.id} />
						</>
					)}
				</>
			)}
		</Body>
	)
}
