import { useState } from "react";
import { Link } from "react-router-dom";
import {auth} from '../../FirebaseConnection'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";



export default function Register() {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate=useNavigate();


   async function handleRegister(e)
    {
     e.preventDefault();
     if(email!==''&& password!== '')
     {
     await createUserWithEmailAndPassword(auth,email,password)
     .then(()=>{
        navigate('/inicio',{replace:true})
         })
         .catch((error)=>{
            if(error.code=='auth/email-already-in-use'){
               alert("Email já existente!")
            }else if(error.code=='auth/weak-password'){
               alert("Senha fraca")
            }
            console.log("ERRO AO CADASTRAR!!")
         })
     }else
     {
        alert('Preencha todos os campos!')
     }
    
    }
    return (

      <div className="home-container">
        <h1>Cadastro</h1>
        <form className="form" onSubmit={handleRegister}>

       <input
       type="text"
       placeholder="Digite seu email..."
       value={email}
       onChange={(e)=> setEmail(e.target.value)}/>
   
    <input
       type="password"
       placeholder="Digite sua senha..."
       value={password}
       onChange={(e)=> setPassword(e.target.value)}/>

        <button type="subimit">Cadastrar</button>

        </form>

        <Link className="button-link" to='/'>
        voltar
        </Link>

      </div>
     
    );
  }
  
  
  