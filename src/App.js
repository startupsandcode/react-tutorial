import Container from 'react-bootstrap/Container';

export default function App() {
	const posts = [
		{
			id: 1,
			text: 'Hello World',
			timestamp: 'a minute ago',
			author: {
				username: 'John',
			},
		},
		{
			id: 2,
			text: 'Hello Mars',
			timestamp: 'a minute ago',
			author: {
				username: 'Susie',
			},
		},
	]

	return (
		<Container fluid>
			<h1>Microblog</h1>
			{posts.length === 0 ? (
				<p>No posts yet</p>
			) : (
				posts.map((post) => {
					return (
						<p key={post.id}>
							<b>{post.author.username}</b> &mdash;{' '}
							<i>{post.timestamp}</i>
							<br />
							{post.text}
						</p>
					)
				})
			)}
		</Container>
	)
}
