import Stack from 'react-bootstrap/Stack'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'

export default function Post({ post }) {
	return (
		<Stack direction='horizontal' gap={3} className='Post'>
			<Image src={post.author.avatar_url + '&s=48'} alt={post.e} />
			<div key={post.id}>
				<p>
					<Link to={'/user/' + post.author.username}>
						{post.author.username}</Link> &mdash;
					{post.timestamp}
				</p>
			<p>
				{post.text}
			</p>
			</div>
		</Stack>
	)
} // end of Post
