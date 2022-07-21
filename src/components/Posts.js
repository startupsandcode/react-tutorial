import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import Post from './Post'
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL
console.log(BASE_API_URL)
export default function Posts() {
	const [posts, setPosts] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			const response = await fetch(`${BASE_API_URL}/api/feed`)
			if (response.ok) {
				const results = await response.json()
				setPosts(results.data)
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
						{posts.length === 0 ?
							<p>No posts yet</p>
						:
						posts.map((post) => <Post key={post.id} post={post} />)}
						}
						</>
					)}
				</>
			)}
		</>
	)
}
