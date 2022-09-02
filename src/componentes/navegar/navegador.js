import { useEffect, useState } from "react";
import {Routes,Route, Router} from 'react-router-dom'

import { Link } from 'react-router-dom';
import axios from "axios";
import ServiciosEmp from "../ServiciosEmp";
import { DataContextProvider } from "../../context/dataContext";
import NavBar from "../navBar";
import Footer from "../footer";
import DetalleServicio from "../detalleServicio";
import Login from "../login/login";
import LoginProv from "../login/loginProv";
import RegistroProv from "../login/registroProv";
import Registro from "../login/registro";
import CarritoP from "../carritoP";
import { URL_BACKEND } from "../../enviroments/enviroments";


const  Navegador=()=>{

    const URL = `${URL_BACKEND}/servicioempresa/`;

    const [servicioEmpresa,setservicioEmpresa]=useState([]);

    let fitro ="xxx";

    const listar=()=>{
        axios.get(URL)
        .then(response=>{
            setservicioEmpresa(response.data);
        })
        .catch(error=>{
            console.log(error);
        })
        
    }

    useEffect(()=>{
        listar();
        
        let  selectedIDs = ["0.50"];
        console.log('---json completo-'+JSON.stringify(servicioEmpresa));
    
        console.log('---json montana-'+JSON.stringify(servicioEmpresa.filter((o) => o.Servicios.servicio_id==27) ))

        console.log('---json aventura-'+ JSON.stringify(servicioEmpresa.filter((list) => list.Servicios.servicio_cat_exp=="aventura")))
        
    },[])

 

    return(

    
        <div>
        
            <NavBar/>

        <DataContextProvider>
           
            <Routes>

                    <Route path='/' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_cat_exp.toLowerCase()=="aventura")} filtro={fitro}/>}/>
                        
                        <Route path='/expAventura' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_cat_exp.toLowerCase()=="aventura")} filtro={fitro}/>}/>
                        <Route path='/expVivencial' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_cat_exp.toLowerCase()=="viviencial")} filtro={fitro}/>}/>
                                    
                        <Route path='/destMontana' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_cat_des.toLowerCase()=="montaña")} filtro={fitro}/>}/>
                        <Route path='/destSelva' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_cat_des.toLowerCase()=="selva")} filtro={fitro}/>}/>
                        <Route path='/destDesierto' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_cat_des.toLowerCase()=="desierto")} filtro={fitro}/>}/>
                        
                        
                        <Route path='/departAmazonas' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_dep.toLowerCase()=="amazonas")} filtro={fitro}/>}/>
                        <Route path='/departIca' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_dep.toLowerCase()=="ica")} filtro={fitro}/>}/>
                        <Route path='/departPuno' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_dep.toLowerCase()=="puno")} filtro={fitro}/>}/>                
                        <Route path='/departCusco' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_dep.toLowerCase()=="cusco")} filtro={fitro}/>}/>

                        <Route path='/departLima' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_dep.toLowerCase()=="lima")} filtro={fitro}/>}/>
                        <Route path='/departMadredeDios' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_dep.toLowerCase()=="madre de dios")} filtro={fitro}/>}/>
                        <Route path='/departAncash' element={<ServiciosEmp servicio={servicioEmpresa.filter((list) => list.Servicios.servicio_dep.toLowerCase()=="anchash")} filtro={fitro}/>}/>
                        
                        <Route path='/login' element={<Login/>}/>  
                        <Route path='/registro' element={<Registro/>}/>  

                        <Route path='/loginProv' element={<LoginProv/>}/>  
                        <Route path='/registroProv' element={<RegistroProv/>}/>  

                        <Route path='/detalleServicio/:servEmpId' element={<DetalleServicio/> }/>  

                        <Route path='/carritoP' element={<CarritoP/> }/>  
                    
                        {/*                 
                        
                        <Route path='servicioDesierto' element={<ServiciosEmp paisajes={dest_desierto}/>}/>
                        <Route path='servicioSelva' element={<ServiciosEmp paisajes={dest_selva}/>}/>*/} 
                
                </Routes>
              
        </DataContextProvider>
           
           <Footer/>

        </div>
 
      
    )
}

export default Navegador;