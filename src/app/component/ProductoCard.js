import React from 'react';

function ProductoCard(props) {
    console.log(props.title);
    return (
        <div className="col">
            <div className="card shadow" >
                <img src={props.img} class="card-img-top"  />
                <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <p class="card-text">{props.description}</p>
                    <p>Stock Disponible: {props.stock}</p>
                    <h3 className="text-success">${props.price}</h3>
                    <a href="#" id={props.id} class="btn btn-primary">Add to Cart</a>
                </div>
            </div>
        </div>
    );
}

export default ProductoCard;