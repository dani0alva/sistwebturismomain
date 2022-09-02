import logo from "./logo/logosf.png";
import axios from "axios";
import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import swal from 'sweetalert'
import { URL_BACKEND } from "../enviroments/enviroments";

const CarritoP = () => {

  const URL = `${URL_BACKEND}/paquete/`;

  let resultado = {};
  let url = "";
  let servemp = "";
  let precio = 0.0;
  let cantidad = 0;
  let subototal = 0.0;
  let descuento = 0.0;
  let montoDescuento = 0.0;

  const navigate = useNavigate()
  const [carrito, setCarrito] = useState([]);
  const [token, setToken] = useState([]);

  useEffect(() => {

    /*validando si existe servicios en el carrito*/
    let serviciocarrito = JSON.parse(localStorage.getItem("items"));
    if (serviciocarrito) {
      setCarrito(serviciocarrito);
    }

    /*validando que el usuario se ha logueado*/
    let tokenexiste = localStorage.getItem("access_token");
    if (tokenexiste) {
        setToken(tokenexiste);
      }
  }, []);


  const mostrarAlertErrorCarrito=()=>{
    swal({
        title:"error",
        text:"carrito vacio",
        icon:"error",
        button:"Aceptar",
        timer:5000

    });
}

const mostrarAlertRegistroError=()=>{
    swal({
        title:"error",
        text:"Porfavor Registrarse y loguearse",
        icon:"error",
        button:"Aceptar",
        timer:5000

    });
}



const mostrarAlertExito=()=>{
    swal({
        title:"exito",
        text:"Se reservó con exito su paquete",
        icon:"success",
        button:"Aceptar",
        timer:5000

    });
}

  /*Borrando los servicios del carrito*/

  const clearCarrito=(items)=>{
    if(items.length>0){
    setCarrito([])
    localStorage.setItem("items",JSON.stringify(carrito));
    localStorage.removeItem('items');
    }else{
        mostrarAlertErrorCarrito();
    }
}

  /*const registrar=(lnk,servemp,precio,cantidad,subototal,montoDescuento)=>{*/

  async function registrar(
    lnk,
    servemp,
    precio,
    cantidad,
    subototal,
    montoDescuento
  ) {
    let servicio = {
      /*lnk:lnk,*/
      servicio_empresa_id: servemp,
      paquete_pre: precio,
      paquete_cant_ser: cantidad,
      /*subototal:subototal,
        montoDescuento:montoDescuento*/
    };

    try {
      const response = await axios.post(URL, servicio);
      return response;
    } catch (error) {
      console.log(error.stack);
    }
  }

  const manejadorSubmit = (items) => {
    if(items.length>0){
        console.log("items es",items)
    if(token.length>2){
        console.log("token es",token,"--",token.length)
    for (let i = 0; i < items.length; i++) {
      resultado = items[i];
      url = resultado["imagen"];
      servemp = resultado["servEmpId"];
      precio = resultado["precio"];
      cantidad = resultado["cantidad"];
      subototal = resultado["precio"] * resultado["cantidad"];

      /*logica de descuento - si compras a partir de 3 tablets de la marca lenovo te llevas un 15 porciento de descuento*/
      descuento =
        resultado["cantidad"] >= 3
          ? resultado["cantidad"] * resultado["precio"] * 0.15
          : 0;

      montoDescuento = resultado["cantidad"] * resultado["precio"] - descuento;

      registrar(url, servemp, precio, cantidad, subototal, montoDescuento);

      
    }
    mostrarAlertExito();
    }else{
        mostrarAlertRegistroError();
        navigate('/registro')
    }
    }else{
        mostrarAlertErrorCarrito();
    }
   
  };

  return (
    <div>
      <p>Total de servicios son: {carrito.length}</p>
      <button
        className="btn btn-warning m-2"
        onClick={() => manejadorSubmit(carrito)}
      >
        Reservar Paquete
      </button>

      <button
        className="btn btn-danger m-2"
        onClick={() => clearCarrito(carrito)}
      >
        Borrar Carrito
      </button>
      <hr />
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>destino :</th>
              <th>servicio_id :</th>
              <th>Precio :</th>
              <th>Participantes :</th>
              <th>subtotal :</th>
              {/*<th>Agregar</th>
                            <th>Eliminar</th>*/}
            </tr>
          </thead>

          <tbody>
            {carrito.map((item) => (
              <tr>
                <td>
                  {" "}
                  <img src={item.imagen} class="d-block w-50" alt="..." />
                </td>
                <td>{item.servEmpId}</td>
                <td>{item.precio}</td>
                <td>{item.cantidad}</td>
                <td>{item.cantidad * item.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      {/*<p className="fs-5 lad fw-bolder text-end">total de la compra $.{total}</p>*/}
    </div>
  );
};

export default CarritoP;
