import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem'; 

const Cart = ( {cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart } ) => {  
    const isEmpty = !cart.line_items.length;
    const classes = useStyles();

    const EmptyCart = () => (
      <Typography variant='subtitle1'>You have no items in your shopping cart, start adding some!
      <Link to="/">Start adding some</Link>
      </Typography>
      );

  const FilledCart = () => (
      <>
            <Grid container spacing={3}>
              {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                  <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}  />
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

  if(!cart.line_items) return 'Loading...';

  return (
    <Container>
      <div className={classes.toolbar} />
     <Typography className={classes.title} varint="h3">Your Shopping Cart</Typography> 
     {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart;
