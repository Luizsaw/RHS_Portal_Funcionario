import { useState } from "react";
import { Link } from "react-router-dom";
import {auth} from '../../FirebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './home.css'
import logo from '../../Assets/portal_funcionario.jpeg'
function Home() {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate= useNavigate();

   
   async function handleLogin(e)
    {
     e.preventDefault();
     if(email!==''&& password!== '')
     {
      
     await signInWithEmailAndPassword(auth,email,password)
     .then(()=>{
    navigate('/inicio',{replace:true})
     })
     .catch(()=>{
        console.log("ERRO AO FAZER LOGIN!!")
     })
     }else
     {
        alert('Preencha todos os campos!')
     }
    
    }
    return (

      <div className="home-container">
      <div><img className='Logo-home'src={logo}/></div> 
        <form className="form" onSubmit={handleLogin}>
        <h1>Login</h1>
       <input
       type="text"
       placeholder="Digite seu email..."
       value={email}
       onChange={(e)=> setEmail(e.target.value)}/>
   
    <input className="input-senha"
       type="password"
       placeholder="Digite sua senha..."
       value={password}
       onChange={(e)=> setPassword(e.target.value)}/>

        <button type="subimit">Entrar</button>

        </form>
      </div>
     
    );
  }
  
  export default Home;
  