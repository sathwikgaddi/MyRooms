import React, {useState, useEffect} from 'react'
import Loader from '../components/Loader';
import Error from '../components/Error';
import axios from 'axios'
import Success from "../components/Success"

function RegisterScreen() {

  const [name, setname] = useState(''); 
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState();
  const[success, setSuccess] = useState();

  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isUppercaseValid, setIsUppercaseValid] = useState(false);
  const [isLowercaseValid, setIsLowercaseValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isSymbolValid, setIsSymbolValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [iscpasswordValid, setIscpasswordValid] = useState(true)

  const handlePasswordChange = (event) => {
    setpassword(event.target.value);

    setIsLengthValid(event.target.value.length >= 8);
    setIsUppercaseValid(/[A-Z]/.test(event.target.value));
    setIsLowercaseValid(/[a-z]/.test(event.target.value));
    setIsNumberValid(/[0-9]/.test(event.target.value));
    setIsSymbolValid(/[-+_!@#$%^&*.,?]/.test(event.target.value));

    setIsPasswordValid(
      event.target.value.length >= 8 &&
        /[A-Z]/.test(event.target.value) &&
        /[a-z]/.test(event.target.value) &&
        /[0-9]/.test(event.target.value) &&
        /[-+_!@#$%^&*.,?]/.test(event.target.value)
    );
  };

  const handleCpassword = (event => {

    setcpassword(event.target.value)

    if(password !== event.target.value) {
      setIscpasswordValid(false)
    }
    else {
    setIscpasswordValid(true)
    }

  })

  


  async function register() {
    if(password === cpassword) {
    const user = {
      name,
      email,
      password,
      cpassword 
    }
    
      setLoading(true);
      axios.post('/api/users/register', user).then(response => {
      setLoading(false);
      setSuccess(true);

      setname('')
      setemail('')
      setpassword('')
      setcpassword('')
    })
    .catch(error =>{
        console.log(error)
        setLoading(false);
        setError(true);
    })
  }
  else {
    alert("Passwords not matched!!")
  }
  }

  return (
    <div>

      {loading && (<Loader></Loader>)}
      {error && (<Error message="Not Successful"></Error>)}

      
      
      <div data-aos="fade-left" className="row justify-content-center mt-5">
        
        <div className='col-md-5'>
        {!(isPasswordValid) && (
        <div className="pass-error text-center mt-5">
          <span role="img" aria-label="Warning">
            ⚠️
          </span>
          Password does not meet complexity requirements
        </div>
      )}

{!(iscpasswordValid) && (
        <div className="pass-error text-center mt-5">
          <span role="img" aria-label="Warning">
            ⚠️
          </span>
          Passwords does not match
        </div>
      )}
        {success && (<Success message="Registration Successfull"></Success>)}
          <div className='bs mt-2 text-center'>

          
            <h2>Register</h2>
            <input type="text" className='form-control mt-2' placeholder='name' value = {name} onChange = {(e) => setname(e.target.value)}></input>
            <input type="email" className='form-control mt-2' placeholder='email'value = {email} onChange = {(e) => setemail(e.target.value)}></input>
            <input type="password" className='form-control mt-2' placeholder='password' value = {password} onChange={handlePasswordChange}></input>
            <input type="password" className='form-control mt-2' placeholder='confirm password' value = {cpassword} onChange = {handleCpassword}></input>

            <button className='btn btn-primary mt-3 ' onClick = {register} disabled={!(isPasswordValid && iscpasswordValid)}> Register </button>
          </div>
          <span>
          <h5 className='text-center mt-5'>Already have an account with us! <a href = "/login">Sign In</a></h5>
          </span>
        </div>
      </div>

      
    </div>
  )
}

export default RegisterScreen
