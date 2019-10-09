import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

const App= (props)=> {
const [blogs, setBlogs] = useState([])
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [user, setUser] = useState(null)
const [notificationMessage, setNotificationMessage] = useState({message:null})
const [postVisible, setPostVisible] = useState(false)


useEffect(()=>{
  blogService.getAll().then(blogs => setBlogs(blogs))
}, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

const notify = (message, type='success')=>{
  setNotificationMessage({message,type})
  setTimeout(()=> setNotificationMessage({message: null}), 5000)
}

const handleLogout = (event)=>{
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)
}

const handleLogin = async (event) => {
  event.preventDefault()
  try {
    const user = await loginService.login({
      username, password,
    })
    
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
  } catch (exception) {
    notify('wrong username or password', 'error')
  }
}

  const hideWhenVisible = {display: postVisible ? 'none': ''}
  const showWhenVisible = {display: postVisible ? '': 'none'}


  if(user===null){
      return(
      <div>
        <Notification notification={notificationMessage} />
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
      username 
      <input
        type="text" 
        value={username}
        name="Username"
        onChange={({target}) => setUsername(target.value)}
      />
      password 
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({target})=>setPassword(target.value)}
      />
    <button type="submit">login</button>
    </form> 
    </div>
      ) 
      }
         return(
           <div>
          <h2>blogs</h2>
           <Notification notification={notificationMessage} />
          <p>
          {user.name} logged in
          <button onClick={handleLogout}type="logout">logout</button>
          </p>
          
          <div style={hideWhenVisible}>
            <button onClick={()=> setPostVisible(true)}>new blog</button>
          </div>
          <div style={showWhenVisible}>
          <NewBlogForm 
          blogs={blogs}
          setBlogs={setBlogs}
          notify={notify}/>
          <button onClick={()=> setPostVisible(false)}>cancel</button>
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}    
        </div>
      
      )
}

export default App;