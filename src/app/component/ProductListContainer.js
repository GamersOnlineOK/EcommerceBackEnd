import ProductoCard from './ProductoCard';
import React, { useEffect, useState } from 'react';

function ProductListContainer(props) {
    const [data,setData]=useState([]);
    useEffect(()=>{
        fetch('/api/productos/listar').then((res)=>res.json()).then((data)=>setData(data));
    },[])

    return (
        <div className="container">
            <div className="row">
            {data !== null  ? (
                data.map((data, index) => {  
                    console.log("aca");
                    console.log(data);                                          
                     return <ProductoCard 
                                    key={data._id} 
                                    id={data._id} 
                                    img={data.img} 
                                    title={data.title} 
                                    description={data.description} 
                                    price={data.price} 
                                    stock={data.stock}/>                    
                })
            ) : (
                <h3 className="text-center mt-5">
                    
                    Cargando
                    </h3>
            )}
            </div>
        </div>
    );
}

export default ProductListContainer;