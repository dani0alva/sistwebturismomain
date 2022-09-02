import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL_BACKEND } from "../enviroments/enviroments";

const DetalleServicio = () => {
 let person={};
 let cartLS;
 const ServicioEmp={};

 const URL = `${URL_BACKEND}/servicioempresa/`;
 
 if (typeof window !== "undefined") {
  cartLS=JSON.parse(localStorage.getItem("items")||"[]")  
}

  const [items,setItems]=useState(cartLS);
  const {servEmpId } = useParams();
  const [objServicioEmp, setObjServicioEmp] = useState({});
  const [cantidadpar,setCantPartic]=useState(0);


  async function manejadorSubmit(){

    try {
    const response =await axios
    .get(URL + servEmpId)
    .then((response) => {
      setObjServicioEmp(response.data.content);
      ServicioEmp=response.data.content;
    });

    return response;

    } catch (error) {
               
                throw error;
       }
  }

  useEffect(() => {
  
    manejadorSubmit();
    
 },[]);
 console.log( objServicioEmp);

 useEffect(() => {
  
   localStorage.setItem("items",JSON.stringify(items));
  
},["items",items]);

  const enviaCarrito=(servicio)=>{
    const existeItem = items.find((item)=>item.servEmpId===servicio.servicio_empresa_id);
    person= {imagen:servicio.servicio_empresa_img, servEmpId: servicio.servicio_empresa_id, precio: servicio.servicio_empresa_pre,cantidad:cantidadpar+1 }
    
    if(existeItem){
      console.log('-exite--');

      setItems(items.map((item)=>
      item={imagen: item.imagen, servEmpId : item.servEmpId, precio:item.precio, cantidad:item.cantidad+1}
      ))
     }else{
      console.log('-no existe--');
      setItems([...items,{...person}])
     }

    setCantPartic(cantidadpar<20?cantidadpar+1:0)
   
    localStorage.setItem("items",JSON.stringify(items));
  }
 


  
  return (
    
  <div>
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-8">
              <article>
                <header className="mb-4">
                  <h1 className="fw-bolder mb-1">
                    Bienvenido al detalle de servicio
                  </h1>

                  <div className="text-muted fst-italic mb-2">
                    Servicio brindado por la empresa
                    <p>{objServicioEmp.Empresa && objServicioEmp.Empresa.empresa_rs}</p>
                  </div>

                </header>

                <div
                  id="carouselExampleFade"
                  class="carousel slide carousel-fade mb-4"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div class="carousel-item active">
                      <img src={objServicioEmp.servicio_empresa_img_det_1} class="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src={objServicioEmp.servicio_empresa_img_det_2} class="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src={objServicioEmp.servicio_empresa_img_det_3} class="d-block w-100" alt="..." />
                    </div>
                  </div>


                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>

                <section className="mb-5">
                  <p className="fs-5 mb-4">
                    {objServicioEmp.servicio_empresa_des}
                  </p>
                  <p className="fs-5 mb-4">{objServicioEmp.servicio_empresa_des2}</p>
                </section>
              </article>
            </div>

            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-header">Buscar</div>
                <div className="card-body">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Ingrese lo que desee buscar.."
                      aria-label="Ingrese lo que desee buscar.."
                      aria-describedby="button-search"
                    />
                    <button
                      className="btn btn-primary"
                      id="button-search"
                      type="button"
                    >
                      Ir!
                    </button>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header">Lo que ofrecemos</div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <a href="#!">Traslado ida y vuelta</a>
                        </li>
                        <li>
                          <a href="#!">Desayuno</a>
                        </li>
                        <li>
                          <a href="#!">Almuerzo</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <a href="#!">hospedaje</a>
                        </li>
                        <li>
                          <a href="#!">Guia Tursitica</a>
                        </li>
                        <li>
                          <a href="#!">Tutorials</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header">Participantes!</div>
                <div className="card-body">
                <div className="row mb-3">
                   <div className="col-md-8">
                  <p>Agrege la cantidad de personas que viajaran con usted</p>
                  </div>
                  <div className="col-md-4">
                  {/*<form className="d-flex">*/}
                        <button className="btn btn-outline-primary"  onClick={() =>enviaCarrito( objServicioEmp)}>
                            <i className="bi bi-person-check-fill"></i>
                           
                            <span className="badge bg-dark text-white ms-1 rounded-pill"><div id="id_cant"> {cantidadpar}</div></span>
                        </button>
                     {/*</form>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    
  );
};

export default DetalleServicio;
