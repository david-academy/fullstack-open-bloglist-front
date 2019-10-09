import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, notify}) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [blogURL, setBlogURL] = useState('')
    
    const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}
	const handleAuthorChange = (event) => {
		setAuthor(event.target.value)
	}
	const handleBlogURLChange = (event) => {
		setBlogURL(event.target.value)
	}

	const handleNewBlogSubmit = async (event) => {
		event.preventDefault()
		const blogObject = {
			title: title,
			author: author,
			url: blogURL,
        }
        
        const addedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(addedBlog))
        setAuthor('')
        setTitle('')
        setBlogURL('')
        notify(`a new blog ${addedBlog.title} by ${addedBlog.author} added `)
	}		
    
	return (
	<>
	<h2>create new</h2>
	<form onSubmit={handleNewBlogSubmit}>
		Title 
		<input type="text" 
		value={title} 
		name="title" 
		onChange={handleTitleChange} 
		/><br />
		Author 
		<input type="text" 
		value={author} 
		name="author" 
		onChange={handleAuthorChange} 
		/><br />
		URL 
		<input type="text" 
		value={blogURL} 
		name="blogURL" 
		onChange={handleBlogURLChange} 
		/><br />
		<input type="submit" value="create"/>
	</form>
 	</>
	)
}

export default BlogForm