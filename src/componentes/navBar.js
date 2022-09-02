import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import logo from './logo/logosf.png';
import { useState, useEffect } from "react";

const NavBar = () => {
    
    const[carrito,setCarrito]=useState([])
   
    const navigate = useNavigate()

    const handlerRegistro = () => {
        navigate('/carritoP')
    }
 
    let serviciocarrito = JSON.parse(localStorage.getItem("items"));

    useEffect(() => {
  
        if(serviciocarrito){
            setCarrito(serviciocarrito)
        }
       
     },[]);

    return (
<div>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="#!"><img src={logo} alt="imagen" className="img-fluid" width="100px" height="auto"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        {/*<li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Inicio</a></li>*/}
                        <Link to="/" className="nav-link active" >Inicio</Link>
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Destino</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                
                            
                               <Link to="/destMontana" className="nav-link active" >Montaña</Link>
                               {/*<Link to="/servicioValle" className="nav-link active" >Valle</Link>*/}
                               <Link to="/destSelva" className="nav-link active" >Selva</Link>
                               <Link to="/destDesierto" className="nav-link active" >Desierto</Link>
                                
                            </ul>
                        </li>

                          <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Experiencia</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                
                                
                           <Link to="/expAventura" className="nav-link active" >Aventura</Link>
                            <Link to="/expVivencial" className="nav-link active" >Vivencial</Link>
                                 {/* <li><a className="dropdown-item" href="#!">Gastronomia</a></li>
                                <li><a className="dropdown-item" href="#!">Historico Cultural</a></li>
                                <li><a className="dropdown-item" href="#!">Exclusivo</a></li>*/} 

                            </ul>
                        </li>

                          <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Departamento</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            
                                <Link to="/departAmazonas" className="nav-link active" >Amazonas</Link>
                                <Link to="/departPuno" className="nav-link active" >Puno</Link>
                                <Link to="/departIca" className="nav-link active" >Ica</Link>
                                <Link to="/departCusco" className="nav-link active" >Cusco</Link>
                                <Link to="/departLima" className="nav-link active" >Lima</Link>
                                <Link to="/departMadredeDios" className="nav-link active" >Madre de Dios</Link>
                                <Link to="/departAncash" className="nav-link active" >Ancash</Link>
                          
                                {/*<li><a className="dropdown-item" href="#!">Ancash</a></li>
                                <li><a className="dropdown-item" href="#!">Ica</a></li>*/} 
                            </ul>
                        </li>

                        

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Login</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            
                                <Link to="/login" className="nav-link active" >Cliente</Link>
                                <Link to="/loginProv" className="nav-link active" >Empresa</Link>
                          
                                {/*<li><a className="dropdown-item" href="#!">Ancash</a></li>
                                <li><a className="dropdown-item" href="#!">Ica</a></li>*/} 
                            </ul>
                        </li>


                    </ul>
                    {/*<form className="d-flex">*/}
                        <button className="btn btn-outline-dark" type="submit" href="#" onClick={()=>handlerRegistro()}>
                            <i className="bi-cart-fill me-1"></i>
                            Total de Servicios Elegidos
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{carrito.length}</span>
                        </button>
                    {/*</form>*/}
                </div>
            </div>
        </nav>
    <header className="bg-bgi py-5">
    <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-black">
            <h1 className="display-4 fw-bolder">Reserva de paquetes </h1>
            <p className="lead fw-bolder text-black-50 mb-0">no pierdas la oprtunidad</p>
        </div>
    </div>
</header>

</div>
    ) }
    export default NavBar;