import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
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
		<Container fluid className='App'>
			<Header />
			<Container>
				<Stack direction='horizontal'>
					<Sidebar />
					<Container>
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
				</Stack>
			</Container>
		</Container>
	)
}
