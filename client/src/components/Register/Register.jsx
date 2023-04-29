import React from 'react'
import './Register.css'
import '../../App.css'
import {Link, NavLink} from 'react-router-dom'

//import icon react-icon
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'
import {MdMarkEmailRead} from 'react-icons/md'

// Import our assets, video and img
import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo2.png'

const Register = () => {
  return (
    <div className='registerPage flex'>
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
              <span className="text"> Already yo have acount?</span>
              <Link to={'../'}>
                <button className="btn">Login</button>
              </Link>
            </div>
          </div>
{/* ## Fin video */}
          <div className="formDiv flex">
            <div className="headerDiv">
              <img src={logo} alt="logo image" />
              <h3>Let us now you</h3>
            </div>
            <form action="" className='form grid'>
              <span className='showMessage'>Register status will go here</span>
              {/* Email */}
              <div className="inputDiv">
                <label htmlFor="email">email</label>
                <div className="input flex">
                  <MdMarkEmailRead className='icon'/>
                  <input type="text" name="" id="email" placeholder='Enter email' />
                </div>
              </div>
              {/* Username */}
              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                  <FaUserShield className='icon'/>
                  <input type="text" name="" id="username" placeholder='Enter username' />
                </div>
              </div>
              {/* Password */}
              <div className="inputDiv">
                <label htmlFor="password">password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className='icon'/>
                  <input type="password" name="" id="password" placeholder='Enter password' />
                </div>
              </div>
              {/* Button */}
              <button type='submit' className='btn flex'>
                <span>Register</span>
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

export default Register