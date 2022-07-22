import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import Post from './Post'
import { useApi } from '../contexts/ApiProvider'

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

export default function Posts() {
	const [posts, setPosts] = useState()
	const api = useApi()

	useEffect(() => {
		(async () => {
			const response = await api.get('/feed')
			if (response.ok) {
				setPosts(response.body.data)
			} else {
				setPosts(null)
			}
		})()
	}, [])

	return (
		<>
			{posts === undefined ? (
				<Spinner animation='border' variant='primary' />
			) : (
				<>
					{posts === null ? (
						<p>Could not retrieve blog posts</p>
					) : (
						<>
							{posts.length === 0 ? (
								<p>No posts yet</p>
							) : (
								posts.map((post) => (
									<Post key={post.id} post={post} />
								))
							)}
						</>
					)}
				</>
			)}
		</>
	)
}
