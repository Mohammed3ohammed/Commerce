import React, { useEffect, useState } from 'react';
import './App.css';
import { commerce } from './lib/commerce';
import Navebar from './components/Navebar/Navebar';
import Product from './components/Products/Product/Product';
import Cart from './components/Cart/Cart';


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
      const item= await commerce.cart.add(productId, quantity);

      setCart(item.cart);
    }

    useEffect(() => {
      fetchProducts();
      fetchCart();
    }, []);

    console.log(cart)
  return (
    <div>
     <Navebar totalItems={cart.total_items} />
     <Product products={products} onAddToCart={handleAddToCart} />
     <Cart cart={cart} />
    </div>
  );
}

export default App;
