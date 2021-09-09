import React, {Component} from 'react';
import Navbar from './component/Navbar';
import ProductContainer from './component/ProductContainer';
import ProductListContainer from './component/ProductListContainer';
 
class App extends Component{

    render(){
        return(
            <>
            <Navbar/>
            <ProductContainer/>
            <ProductListContainer/>
            </>
        )
    }
}
export default App;