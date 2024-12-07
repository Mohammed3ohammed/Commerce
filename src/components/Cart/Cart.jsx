import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem'; 

const Cart = ( {cart,onUpdateCartQty, onRemoveFromCart, onEmptyCart} ) => { 
  const classes = useStyles();
  const handleEmptyCart = () => onEmptyCart();    
    const renderEmptyCart = () => (
      <Typography varaint="subtitle1">You have no items in your shopping cart,
        <Link className={classes.link} to="/">start adding some</Link>!</Typography>
    );

    if(!cart.line_items) return 'Loading';


  const renderCart = () => (
      <>
            <Grid container spacing={3}>
              {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                  <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart}  />
                </Grid>
              ))}
            </Grid>
            <div className={classes.cardDetails}>
              <Typography variant='h4'>Subtotal: {cart.subtotal.fromatted_with_symbol}</Typography>
              <div>
              <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
              <Button component={Link} to="/checkout" className={classes.checkout} size="large" type="button" variant="contained" color="primary">Checkout</Button>
              </div>
            </div>
      </>
  );


  return (
    <Container>
      <div className={classes.toolbar} />
     <Typography className={classes.title} varint="h3" gutterBottom>Your Shopping Cart</Typography> 
     {!cart.line_items.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;
