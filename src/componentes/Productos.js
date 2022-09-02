

const Productos=(props)=>{

    let  productos = props.productos;
    let enviarCarrito =props.adiciona;

    return(

        <div className="container">
            <p>Productos:{productos.length}</p>
            <div className="row">
            {
                    productos.map((producto)=>(
                    <div className="col col-4" key={producto.id}>
                        <div className="card shadow p-2 m-2">
                            <div className="card-header">
                                <div className="card-title">
                                {producto.nombre} Marca: {producto.marca}
                                </div>
                                <div className="card-body">
                                    <img src={producto.imagen} alt="imagen" className="img-fluid" />
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary m-2" onClick={()=>enviarCarrito(producto)}>
                                        Enviar a Carrito
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                         ))
                }

            </div>
        </div>

    )
}

    
export default Productos