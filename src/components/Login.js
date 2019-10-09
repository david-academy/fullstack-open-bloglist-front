import React, {useState} from 'react'
import loginService from '../services/login'
import blogs from '../services/blogs'
import Blog from './Blog'
 

const Login = (props)=>{
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [user, setUser] = useState(null)

const handleLogin = async (event)=>{
    event.preventDefault()
    console.log('loggin in with ', username, password)
    try {
        const user = await loginService.login({
            username, password,
        })
    setUser(user)
    setUsername('')
    setPassword('')
    } catch (exception){
        console.log('något gick fel', exception)
    }
}
if (user === null){
    return(
        <div>
            <h2>Log in to application</h2>
        
        <form onSubmit={handleLogin}>
            <div>
            username 
            <input
            type="text" 
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
            />
            </div>
            <div>
            password 
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({target})=>setPassword(target.value)}
            />
            </div>
            <div>
            <button type="submit">login</button>
            </div>
        </form>
        </div>
        )
    }
    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
                )}
        </div>
    )
}

export default Login
