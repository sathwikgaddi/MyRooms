import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import SecureLS from "secure-ls";
import ReactCaptcha from 'modern-react-captcha';
import Swal from 'sweetalert2'
import reloadIcon from "../images/refresh.svg";

const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

function LoginScreen() {

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState('');
  const[isError, setisError] = useState();
  const[captchaValid, setcaptchaValid] = useState(false);


  const handleSuccess = () => setcaptchaValid(true);
	const handleFailure = () => setcaptchaValid(false)


 

  async function login()  {

    if(captchaValid) {
    
    const user = {
      email,
      password
    }


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
      setError(error.response.data)
      setisError(true);
      
    });
  }
  else {
    Swal.fire("Oops!", "Captcha not Valid", "error")
  }
  }
    


  

  return (
    <div>

    {loading && (<Loader></Loader>)}

      <div data-aos="fade-left" className="row justify-content-center mt-5 text-center">
        <div className='col-md-5'>
          {isError && (<Error message = {error} ></Error>) }
          <div className='bs mt-5' >
            <h2>Login</h2>
            
            <input type="email" className='form-control mt-2' placeholder='email'value = {email} onChange = {(e) => setemail(e.target.value)}></input>
            <input type="password" className='form-control mt-2' placeholder='password' value = {password} onChange = {(e) => setpassword(e.target.value)}></input>
            
            <div>
            <ReactCaptcha  
            charset='uln'
            length={6}
            color='black'
            bgColor='white'
            reload={true}
            // reloadText='Reload Captcha'
            reloadIcon={reloadIcon}
            handleSuccess={handleSuccess}
            handleFailure={handleFailure} />

            </div>
            

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
