import { data } from 'browserslist';
import React, { useEffect, useState } from 'react';

function ProductContainer(props) {
    const [value, setValue] = useState({title:" "});
    
        const SendProduct = () => {
        console.log("enviado");
        let date = Date.now();
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        let code = document.getElementById('code').value;
        let img = document.getElementById('imagen').value;
        let price = document.getElementById('price').value;
        let stock = document.getElementById('stock').value;
        fetch('/api/productos/guardar', {
            method: "POST",
            body: JSON.stringify({
                timestamp: date,
                title: title,
                description: description,
                code: code,
                img: img,
                price: price,
                stock: stock

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => setValue(data))
            .catch(err => console.log(err));

    }
    

    return (
        <div className="container w-50 mt-5">
            <div class="row justify-content-center">
                <div class="col-12 mt-2">
                    <input type="text" class="form-control" id="title" placeholder="Producto" aria-label="Producto" />
                </div>
                <div class="col-12 mt-2">
                    <input type="text" class="form-control" id="description" placeholder="Detalle" aria-label="Detalle" />
                </div>
                <div class="col-12 mt-2">
                    <input type="text" class="form-control" id="code" placeholder="Codigo" aria-label="Codigo" />
                </div>
                <div class="col-12 mt-2">
                    <input type="text" class="form-control" id="imagen" placeholder="Imagen" aria-label="imagen" />
                </div>
                <div class="col-12 mt-2">
                    <input type="text" class="form-control" id="price" placeholder="Precio" aria-label="Precio" />
                </div>
                <div class="col-12 mt-2">
                    <input type="text" class="form-control" id="stock" placeholder="Stock" aria-label="stock" />
                </div>

                <div className="col-12 mt-2">
                    <button onClick={SendProduct} className="btn btn-success ">Enviar</button>
                </div>
                <div>
                    <h1>{value.title}</h1>
                </div>

            </div>
            
        </div>
    );
}

export default ProductContainer;