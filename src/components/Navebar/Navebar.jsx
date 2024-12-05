import React from 'react';
import { AppBar, Toolbar, IconButton, Badge,  Typography   } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/commerce.png';
import useStyles from './styles.js';

const Navebar = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
                <Typography variant='h6' className={classes.title} color="inherit">
                    <img src={logo} alt="Commerce.js" height='25px' className={classes.image} />
                     Commers.js
                </Typography>
                <div className={classes.grow} />
                <div className={classes.button} >
                    <IconButton aria-label='Show car items' color='inherit'>
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navebar;