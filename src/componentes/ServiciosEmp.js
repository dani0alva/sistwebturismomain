import React from 'react';
import { useContext } from 'react';
import {Routes,Route, useNavigate} from 'react-router-dom'

const ServiciosEmp=(props)=>{
    
    /*const { updateIdservEmp } = useContext(DataContext)*/
    const navigate = useNavigate()

    const handlerServicioDetalle = (servicioEmpId) => {
        /*updateIdservEmp(servicioEmpId)*/
        navigate(`/detalleServicio/${servicioEmpId}`)
    }
     

    let [servicios2] = [props.servicio];
    /*let [servicios] = [props.servicio.filter((list) => list.servicios.some(o => ['aventura'].includes(o.cat_experiencia.toLowerCase()))) ];*/

    
    let continente =props.filtro;


    return(
        <div className="container">
     
            <section class="py-5">
            <div class="container px-4 px-lg-5 mt-2">

                
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center" >
                {
                servicios2.map((data)=>(
                    <div class="col mb-5" >
                        <div class="card h-100">

                          
                            <img class="card-img-top" src={data.servicio_empresa_img} alt="..." />
                           
                            <div class="card-body p-4">
                                <div class="text-center">
                                    
                                    <h5 class="fw-bolder">{data.Servicios.servicio_nom}</h5>
                                  <p>{data.Servicios.servicio_nom}</p>
                                    <p>{data.precio}</p>
                                    <p>{data.duracion}</p>
                                </div>
                            </div>
                            
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center">
                                    <a class="btn btn-outline-dark mt-auto" href="#" onClick={()=>handlerServicioDetalle(data.servicio_empresa_id)}>Detalle del Servicio</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                     ))
                    }
                </div>
               
            </div>
        </section>
        </div>
       
    )
    
}

    
export default ServiciosEmp;