import { useState, useEffect, useContext } from "react"
import axiosInstance from "../../axiosApi/axiosApi";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import swal from 'sweetalert'

const RegistroProv=()=>{


const [nombre, setNombre] = useState("")
const [apellidos, setApellidos] = useState("")

const [ruc, setRuc] = useState("")
const [razon_social, setRazonSocial] = useState("")
const [email, setEmail] = useState("")
const [telefono, setTelefono] = useState("")
const [direccion, setDireccion] = useState("")
const [paginaweb, setPaginaWeb] = useState("")

const [contraseña, setContraseña] = useState("")
const [contraseñar, setContraseñar] = useState("")

const [proveedor, setProveedor] = useState([]) 

const navigate = useNavigate()

const handlerLogin = () => {
    navigate('/loginProv')
}

const mostrarAlertExito=()=>{
    swal({
        title:"exito",
        text:"Se registro con existo",
        icon:"success",
        button:"Aceptar",
        timer:5000

    });
}

const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmail(email);
    } else {
      /*setEmailError('Enter valid Email!')*/
    }
  };



const manejadorSubmit=(e)=>{

    e.preventDefault();

    registrar(nombre,apellidos,email,contraseña,contraseñar,direccion,telefono,paginaweb,ruc,razon_social);
    window.location.reload();
}



const registrar=(nombre,apellidos,email,contraseña,contraseñar,direccion,telefono,paginaweb,ruc,razon_social)=>{
    
    let empresa={
        first_name:nombre,
        last_name:apellidos,
        email:email,
        username:email,
        password:contraseña,
        direccion:direccion,
        telefono:telefono,
        paginaweb:paginaweb,
        ruc:ruc,
        razon_social:razon_social,
        registro:1
    }

    if(contraseña===contraseñar)
    {
        try {
            const response =  axiosInstance.post('/user/create/',empresa);
            setProveedor(response.data);
            mostrarAlertExito();

            return response;
        } catch (error) {
            console.log(error.stack);
            this.setState({
                errors:error.response.data
            });
        }
    }else{
        alert("Los passwords deben de coincidir");
    }


}


return(
<div className="bg-secondary">
<div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Crear Cuenta Proveedor</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={manejadorSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Ingrese RUC  de la Empresa" value={ruc} onChange={(e)=>setRuc(e.target.value)} />
                                                        <label for="inputFirstName">RUC</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputLastName" type="text" placeholder="Ingrese Razon Social" value={razon_social} onChange={(e)=>setRazonSocial(e.target.value)}/>
                                                        <label for="inputLastName">Razon Social</label>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                 
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Ingresa tu Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                                                        <label for="inputFirstName">Nombre Responsable</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputLastName" type="text" placeholder="Ingresa tu Apellido" value={apellidos} onChange={(e)=>setApellidos(e.target.value)}/>
                                                        <label for="inputLastName">Apellidos Responsable</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Ingresa tu Nombre" value={telefono} onChange={(e)=>setTelefono(e.target.value)} />
                                                        <label for="inputFirstName">Tefono</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputLastName" type="text" placeholder="Ingresa tu Apellido" value={paginaweb} onChange={(e)=>setPaginaWeb(e.target.value)}/>
                                                        <label for="inputLastName">Pagina Web</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="text" placeholder="Ingrese el domicilio fiscal"  value={direccion} onChange={(e)=>setDireccion(e.target.value)}/>
                                                <label for="inputEmail">Direccion Comercial</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com"  onChange={(e)=>validateEmail(e)}/>
                                                <label for="inputEmail">Correo Electronico</label>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPassword" type="password" placeholder="Create a password" value={contraseña} onChange={(e)=>setContraseña(e.target.value)}/>
                                                        <label for="inputPassword">Password</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" value={contraseñar} onChange={(e)=>setContraseñar(e.target.value)}/>
                                                        <label for="inputPasswordConfirm">Confirmar Password</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 mb-0">
                                                {/*<div className="d-grid"><a className="btn btn-primary btn-block" href="#">CrearCuenta</a></div>*/}
                                                <div className="d-grid"><button className="btn btn-primary btn-block">CrearCuenta</button></div>
                
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                   
                                        <div className="small"><a href="#" onClick={()=>handlerLogin()}>Tienes una cuenta? Ir al login</a></div>
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
export default RegistroProv