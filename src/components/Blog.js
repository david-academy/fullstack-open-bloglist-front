import React, {useState} from 'react'

const Blog = ({blog}) => {
const [visible, setVisible]= useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = {display: visible ? '': 'none'}
  const toggleVisibility =()=>{
    setVisible(!visible)
    console.log(blog.user.name)

  }

return(
 <div style={blogStyle}> 
   <div onClick={()=> toggleVisibility()}>
    {blog.title} {blog.author} 
  </div>
  <div style={showWhenVisible}>
    <p>{blog.url}</p>
    <p>{blog.likes} likes </p>
    <p>added by {blog.user.name}</p>
  </div>
  </div>


)
}

export default Blog