
import { useEffect, useState } from "react";
import {Routes,Route, useNavigate} from 'react-router-dom'
import axiosInstance from "../../axiosApi/axiosApi";
import axios from 'axios';
import swal from 'sweetalert'

const LoginProv =()=>{

    const [usuarioProve,setusuarioProve]=useState([]);
    const [email, setEmail] = useState("")
    const [contraseña, setContraseña] = useState("")

    const navigate = useNavigate()

    const handlerRegistro = () => {
        navigate('/registroProv')
    }


    const mostrarAlertError=()=>{
        swal({
            title:"error",
            text:"Usuario o contraseña incorrecta",
            icon:"error",
            button:"Aceptar",
            timer:5000

        });
    }

    const mostrarAlertExito=()=>{
        swal({
            title:"exito",
            text:"Se logueo con existo",
            icon:"success",
            button:"Aceptar",
            timer:5000

        });
    }

 
     async function manejadorSubmit(e){
        e.preventDefault();
        let usuario={
            username:email,
            password:contraseña}
            
            try {
                const response =  await axiosInstance.post('/token/obtain/', usuario);
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                setusuarioProve(response.data);
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                
                mostrarAlertExito();
                
                return response;

            } catch (error) {
                mostrarAlertError();
                throw error;
            }
    }

    /*useEffect (()=>{

    },[])*/

    return(

        <div className="bg-secondary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content ">
                <main >
                    <div className="container ">
                        <div className="row justify-content-center ">
                            <div className="col-lg-5 mb-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login Empresa</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={manejadorSubmit}>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                                <label for="inputEmail">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputPassword" type="password" placeholder="Password" value={contraseña} onChange={(e)=>setContraseña(e.target.value)}/>
                                                <label for="inputPassword">Password</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label" for="inputRememberPassword">Recordar Password</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a className="small" href="password.html">Olvide Password?</a>
                                                <a className="btn btn-primary"><button className="btn btn-primary btn-block">Login</button></a>
                                                
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><a class="btn btn-outline-dark mt-auto" href="#" onClick={()=>handlerRegistro()}>Necesita nueva cuenta? Click Aqui!</a></div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
           
        </div>
       
    </div>
            
    )

    
}

export default LoginProv;