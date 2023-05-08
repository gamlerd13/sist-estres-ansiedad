import {useState, useEffect} from 'react';
import './Login.css';
import '../../App.css';
import {Link, useNavigate} from 'react-router-dom';


// Import icon react-icon
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'

// Import our assets, video and img
import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo2.png'

// Axios support
import axios from 'axios'

//para las sesiones

const Login = () => {
  // Here we create a new Login
  const [loginUserName, setLoginUserName]=useState('')
  const [loginPassword, setLoginPassword]=useState('')

  // para las los mensajes que aparece en incio de sesion;
  const [response, setResponse]  = useState('');
  const [styleStatus, setStyleStatus] = useState('')

  // Para los datos del usuario desde la bd
  // const [user, setUser]= useState('');
  // const [email, setEmail]= useState('');

  const navigateTo = useNavigate();



  // Principal function
  const LoginUser = ()=>{
    // e.preventDefault();
    console.log('hasta aqui bien')


    axios.post('http://localhost:3002/Login',{
      // Creamos una variable para enviar al servidor mediante rutas
      LoginUserName: loginUserName,
      LoginPassword: loginPassword
    }).then((res)=>{
      console.log(res);
      console.log(res.data.message)

      setResponse(res.data.message);

      if(res.data.message|| loginUserName=='' || loginPassword=='' ){
        navigateTo('/')
      }else{
        navigateTo('/dashboard')

        //capturar datos
        // setUser(response.data[0].nick);
        // setEmail(response.data[0].email);

      }

    }).catch(error => console.log("Hubo un error lo capturó el catch: ",error))

  }

  // Para establecer los estilos del mensaje del login y darle nombres a las clases
useEffect(() => {
  if(response !==""){
    setStyleStatus('showMessage') //muestra mensaje
    setTimeout(() => {
      setStyleStatus('message')   //esconde mensaje 1 sec
    }, 1000)
  }
},[response])


// Para limpiar los inputs
const handleSubmit = (e)=>{
  e.preventDefault();
  setLoginUserName('');
  setLoginPassword('');

  // Capturar datos
  console.log('Borrando inf en onSubmit')

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
            <form className='form grid' onSubmit={handleSubmit}>
              <span className={styleStatus}>{response}</span>
              {/* Username */}
              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                  <FaUserShield className='icon'/>
                  <input value={loginUserName} type="text" name="" id="username" placeholder='Enter username' onChange={(event)=>{
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
                  <input value={loginPassword} type="password" name="" id="password" placeholder='Enter password' onChange={(event)=>{
                    setLoginPassword(event.target.value)
                    console.log(loginPassword)
                  }}/>
                </div>
              </div>
              {/* Button */}
              <button type='submit' className='btn flex' onClick={LoginUser}>
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