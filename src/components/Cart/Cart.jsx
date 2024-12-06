import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles'; 

const Cart = ( {cart} ) => {  
    const isEmpty = !cart.line_items.length;
    const classes = useStyles();

    const EmptyCart = () => (
      <Typography variant='subtitle1'>You have no items in your shopping cart, start adding some!</Typography>
    
      );

  const FilledCart = () => (
      <>
            <Grid Container spacing={3}>
              {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                  <div>{item.name}</div>
                </Grid>
              ))}
            </Grid>
            <div className={classes.cardDetails}>
              <Typography variant='4'>Subtotal: {cart.subtotal.fromatted_with_symbol}</Typography>
              <div>
              <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
              <Button className={classes.checkout} size="large" type="button" variant="contained" color="primary">Checkout</Button>
              </div>
            </div>
      </>
  );

  if(!cart.line_items) return 'Loading...';

  return (
    <Container>
      <div className={classes.toolbar} />
     <Typography className={classes.title} varaint="h3">Your Shopping Cart</Typography> 
     {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart;