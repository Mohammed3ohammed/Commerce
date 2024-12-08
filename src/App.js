import React, { useEffect, useState } from 'react';
import './App.css';
import { commerce } from './lib/commerce';
import Navbar from './components/Navebar/Navbar.jsx';
import Product from './components/Products/Product/Product';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Check/Checkout.jsx';
import { CssBaseline } from '@material-ui/core';


const App = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [products, setProducts] = useState([]); 
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
      const { data } = await commerce.products.list();

      setProducts(data)
    } ;

    const fetchCart = async () => {
      
      setCart( await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
      const item = await commerce.cart.add(productId, quantity);

      setCart(item.cart);
    };

    const handleUpdateCartOty = async (lineItemId, quantity) => {
      const response  = await commerce.cart.update(lineItemId, { quantity });

      setCart(response.cart);
    };

    const handleRemoveFromCart = async (lineItemId) => {
     const response = await commerce.cart.remove(lineItemId);
      setCart(response.cart);
    };

    const handleEmptyCart = async () => {
      const response = await commerce.cart.empty();

      setCart(response.cart);
    };

    const refreshCart = async () => {
      const newCart = await commerce.cart.refresh();

      setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

        setOrder(incomingOrder);

        refreshCart();

      } catch (error) {
        setErrorMessage(error.data.error.message);
      }
    };
 
    useEffect(() => {
      fetchProducts();
      fetchCart();
    }, []);

   const handleDrawerToggle = () => setMobileOpen(!mobileOpen); 

  return (

    <Router>
      <div style={{display: 'flex'}}>
        <CssBaseline />
     <Navbar totalItems={cart.total_items}  handleDrawerToggle={handleDrawerToggle}/>
     <Switch>
          <Route exact path="/">
          <Product products={products} onAddToCart={handleAddToCart} handleUpdateCartOty />
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
            <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
          </Route>
     </Switch>
    </div>
    </Router>
  );
}

export default App;
