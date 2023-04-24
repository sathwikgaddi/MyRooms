import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

function LoginScreen() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState();

  async function login()  {
    
    const user = {
      email,
      password
    }

    // try {
    //   setLoading(true)
    //   const result = await axios.post('/api/users/login', user).data
    //   console.log("Came here")
    //   setLoading(false)


    // }
    // catch(error) {
    //     console.log(error)
    //     setLoading(false)
    //     setError(true)
    setLoading(true)
    axios.post('/api/users/login', user)
    .then(response => {
      setError(false)
      setLoading(false)
      const {token} = response.data
      ls.set('token', token);
      window.location.href = "/home"
      
    })
    .catch(error => {
      setLoading(false)
      setError(true)
    });
  }
    

  return (
    <div>

    {loading && (<Loader></Loader>)}

      <div className="row justify-content-center mt-5 text-center">
        <div className='col-md-5'>
          {error && (<Error message="Invalid credentials!!"></Error>) }
          <div className='bs mt-5' >
            <h2>Login</h2>
            
            <input type="email" className='form-control mt-2' placeholder='email'value = {email} onChange = {(e) => setemail(e.target.value)}></input>
            <input type="password" className='form-control mt-2' placeholder='password' value = {password} onChange = {(e) => setpassword(e.target.value)}></input>
               

            <button className='btn btn-primary mt-3' onClick = {login}> Login </button>
          </div>
          <span>
          <h5 className='text-center mt-5'>Don't have an account with us! <a href = "/register">Join Now</a></h5>
          </span>
        </div>
        
      </div>
    </div>
  )
}

export default LoginScreen
