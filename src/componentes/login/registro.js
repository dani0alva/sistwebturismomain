import { useState, useEffect, useContext } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosApi/axiosApi";
import validator from "validator";
import swal from 'sweetalert'

const Registro=(props)=>{

const [nombre, setNombre] = useState("")
const [apellidos, setApellidos] = useState("")
const [email, setEmail] = useState("")

const [pais, setPais] = useState("")
const [ciudad, setCiudad] = useState("")
const [sexo, setSexo] = useState("")
const [telefono, setTelefono] = useState("")
const [tipoDoc, setTipoDoc] = useState("")
const [nroDoc, setNroDoc] = useState("")

const [username, setUserName] = useState("")
const [contraseña, setContraseña] = useState("")
const [contraseñar, setContraseñar] = useState("")
const [turistapais, setTuristaPais] = useState("")
const [emailError, setEmailError] = useState('')

const [turista, setTurista] = useState([]) 

const navigate = useNavigate()

const handlerLogin = () => {
    navigate('/login')
}

const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmail(email);
    } else {
      /*setEmailError('Enter valid Email!')*/
    }
  };

  const mostrarAlertExito=()=>{
    swal({
        title:"exito",
        text:"Se registro con existo",
        icon:"success",
        button:"Aceptar",
        timer:5000

    });
}


const manejadorSubmit=(e)=>{

    e.preventDefault();

    registrar(nombre,apellidos,email,contraseña,contraseñar,pais,ciudad,sexo,telefono,tipoDoc,nroDoc);
    window.location.reload();
}



const registrar=(nombre,apellidos,email,contraseña,contraseñar,pais,ciudad,sexo,telefono,tipoDoc,nroDoc)=>{
    
    let usuario={
        first_name:nombre,
        last_name:apellidos,
        email:email,
        username:email,
        password:contraseña,
        pais:pais,
        ciudad:ciudad,
        sexo:sexo,
        telefono:telefono,
        tipoDoc:tipoDoc,
        nroDoc:nroDoc,
        registro:0
    }

    if(contraseña===contraseñar)
    {
        try {
            const response =  axiosInstance.post('/user/create/',usuario);
            setTurista(response.data);
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

/*useEffect(()=>{
    listar();
},[])*/


return(
<div className="bg-secondary">
<div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Crear Cuenta Turista</h3></div>
                                    <div className="card-body">
                                        <form onSubmit={manejadorSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Ingresa tu Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                                                        <label for="inputFirstName">Nombres</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputLastName" type="text" placeholder="Ingresa tu Apellido" value={apellidos} onChange={(e)=>setApellidos(e.target.value)}/>
                                                        <label for="inputLastName">Apellidos</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Ingresa tu Pais" value={pais} onChange={(e)=>setPais(e.target.value)} />
                                                        <label for="inputFirstName">Pais</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputLastName" type="text" placeholder="Ingresa tu Ciudad" value={ciudad} onChange={(e)=>setCiudad(e.target.value)}/>
                                                        <label for="inputLastName">Ciudad</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-check" onClick={() => setSexo("M")}>
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                                    <label className="form-check-label" for="flexRadioDefault1">
                                                        Masculino
                                                    </label>
                                                    </div>

                                                    <div className="form-check" onClick={() => {setSexo("F")}}>
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                                                    <label className="form-check-label" for="flexRadioDefault2">
                                                        Femenino
                                                    </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-md-4">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputFirstName" type="text" placeholder="Ingresa tu Telefono" value={telefono} onChange={(e)=>setTelefono(e.target.value)} />
                                                        <label for="inputFirstName">Telefono</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                <select className="form-select" aria-label="Default select example" onChange={(e) => setTipoDoc(e.target.value)}>
                                                    <option selected>Tipo Documento</option>
                                                    <option value="DNI">DNI</option>
                                                    <option value="PASAPORTE">Pasaporte</option>
                                                    <option value="CARNET">Carnet de Extranjeria</option>
                                                    <option value="LIBRETA">Libreta Electoral</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input className="form-control" id="inputLastName" type="text" placeholder="Ingresa tu Apellido" value={nroDoc} onChange={(e)=>setNroDoc(e.target.value)}/>
                                                        <label for="inputLastName">Nro Documento</label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com"  onChange={(e)=>validateEmail(e)}/>
                                                <label for="inputEmail">Correo Electronico</label>
                                            </div>

                                            <span style={{
                                            fontWeight: 'bold',
                                            color: 'red',
                                            }}>{emailError}</span>
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
export default Registro