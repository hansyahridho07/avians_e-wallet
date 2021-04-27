import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../store/action'

export default function Login() {
  const [formLogin, setFormLogin] = useState({
    username: '',
    password: ''
  })
  const loginStatus = useSelector(state => state.loginStatus.isLoggedIn)
  const dispatch = useDispatch()
  useEffect(() => {}, [loginStatus])

  function handleChange(e){
    const {value, name} = e.target
    setFormLogin({
      ...formLogin,
      [name]: value
    })
  }

  function addLogin(e){
    e.preventDefault()
    dispatch(login(formLogin))
    setFormLogin({
      username: '',
      password: ''
    })
  }
  return (
    <>
      <div className="container" style={{width:'500px'}}>
        <h1 className="text-center">Login</h1>
        <form onSubmit={addLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" name="username" value={formLogin.username} className="form-control" onChange={(e) => handleChange(e)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name='password' value={formLogin.password} className="form-control" onChange={(e) => handleChange(e)} />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </>
  );
}
