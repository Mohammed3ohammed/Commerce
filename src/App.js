import React, { useEffect, useState } from 'react';
import './App.css';
import { commerce } from './lib/commerce';
import Navbar from './components/Navebar/Navbar.jsx';
import Product from './components/Products/Product/Product';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Check/Checkout.jsx';


const App = () => {
    const [products, setProducts] = useState([]); 
    const [cart, setCart] = useState({})
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();

      setProducts(data)
    } 

    const fetchCart = async () => {
      
      setCart( await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
      const { cart } = await commerce.cart.add(productId, quantity);

      setCart(cart);
    }

    const handleUpdateCartOty = async (productId, quantity) => {
      const response  = await commerce.cart.add(productId, quantity);

      setCart(response.cart);
    }

    const handleRemoveFromCart = async (productId) => {
      const { cart }  = await commerce.cart.remove(productId);
      setCart(cart);
    }

    const handleEmptyCart = async () => {
      const { cart } = await commerce.cart.empty();

      setCart(cart);
    }


    useEffect(() => {
      fetchProducts();
      fetchCart();
    }, []);

    console.log(cart)
  return (

    <Router>
      <div>
     <Navbar totalItems={cart.total_items} />
     <Switch>
          <Route exact path="/">
          <Product products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path='/cart'>
          <Cart 
          cart={cart} 
          handleUpdateCartOty = {handleUpdateCartOty}
          handleRemoveFromCart = {handleRemoveFromCart}
          handleEmptyCart = {handleEmptyCart}
          
          />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
     </Switch>
    </div>
    </Router>
  );
}

export default App;
