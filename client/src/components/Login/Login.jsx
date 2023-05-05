import {useState} from 'react'
import './Login.css'
import '../../App.css'
import {Link} from 'react-router-dom'

//import icon react-icon
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'

// Import our assets, video and img
import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo2.png'

import axios from 'axios'

const Login = () => {
  //Here we create a new Login
  const [loginUserName, setLoginUserName]=useState('')
  const [loginPassword, setLoginPassword]=useState('')

  const loginUser = (e)=>{
    e.preventDefault();
    console.log('hasta aqui bien')


    axios.post('http://localhost:3002/Login',{
      //creamos una variable para enviar al servidor mediante rutas
      LoginUserName: loginUserName,
      LoginPassword: loginPassword
    }).then((response)=>{
      console.log(response)
    })
    .catch(error => console.log("Hubo un error lo capturó el catch: ",error))
  }



  return (
    <div className='loginPage flex'>
        {/* <a href='/Register'>to Register</a>
        <br/>
        <a href='/Dashboard'>to Dashboard</a>
        <br/>
        This is a login page */}
        <div className="container flex">
{/* ### incio video */}
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>
            <div className="textDiv">
              <h2 className="title">Salud mental, cura la ansiedad</h2>
              <p>Adopt the correct form of life</p>
            </div>
            <div className="footerDiv flex">
              <span className="text"> Dont have acount?</span>
              <Link to={'./register'}>
                <button className="btn">Sign up</button>
              </Link>
            </div>
          </div>
{/* ## Fin video */}
          <div className="formDiv flex">
            <div className="headerDiv">
              <img src={logo} alt="logo image" onClick={()=>{console.log(loginUserName,loginPassword)}}/>
              <h3>Welcome Back!</h3>
            </div>
            <form action="" className='form grid'>
              <span className='showMessage'>Login status will go here</span>
              {/* Username */}
              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                  <FaUserShield className='icon'/>
                  <input type="text" name="" id="username" placeholder='Enter username' onChange={(event)=>{
                    setLoginUserName(event.target.value);
                    console.log(loginUserName);
                  }}/>
                </div>
              </div>
              {/* Password */}
              <div className="inputDiv">
                <label htmlFor="password">password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className='icon'/>
                  <input type="password" name="" id="password" placeholder='Enter password' onChange={(event)=>{
                    setLoginPassword(event.target.value)
                    console.log(loginPassword)
                  }}/>
                </div>
              </div>
              {/* Button */}
              <button type='submit' className='btn flex' onClick={loginUser}>
                <span>Login</span>
                <AiOutlineSwapRight className='icon'/>
              </button>
              <span className='forgotPassword'>
                Forgot your password? <a href="">Click Here</a>
              </span>

            </form>
          </div>
        </div>

    </div>

  )
}

export default Login