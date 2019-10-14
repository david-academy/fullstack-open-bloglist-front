import React, {useState} from 'react'

const Blog = ({blog, likeButtonHandler, removeButtonHandler, currentUser}) => {
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
  const removeButton = ()=>{
    return currentUser === blog.user.username
    ? (<button onClick={removeButtonHandler}>Remove</button>)
    : (<></>)
  }

return(
 <div style={blogStyle}> 
   <div onClick={()=> toggleVisibility()}>
    {blog.title} {blog.author} 
  </div>
  <div style={showWhenVisible}>
    <p>{blog.url}</p>
    <p>{blog.likes} likes <button onClick={likeButtonHandler}>Like</button></p>
   
    <p>added by {blog.user.name}</p>
    {removeButton()}
  </div>
  </div>


)
}

export default Blog