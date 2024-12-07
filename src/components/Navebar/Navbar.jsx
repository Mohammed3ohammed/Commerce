import React, {useState} from 'react';
import { AppBar, Toolbar, IconButton, Badge, Menu , Typography, MenuItem   } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/commerce.png';
import useStyles from './styles.js';
import { Link, useLocation } from 'react-router-dom';


const PrimarySearchAppBar = ( { totalItems } ) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const location = useLocation();


  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';


  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted
     transrormOrigin={{vertical: 'top', horizontal: 'right'}} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
        <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCart />
        </Badge>
        </IconButton>
        <p>Cart</p>
        </MenuItem>
     </Menu>
  )

  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
                <Typography component={Link} to="/" variant='h6' className={classes.title} color="inherit">
                    <img src={logo} alt="Commerce.js" height='25px' className={classes.image} />
                     Commerc.js
                </Typography>
                <div className={classes.grow} />
                {location.pathname === '/' && (
                <div className={classes.button} >
                  <Link to="/cart">go to cart</Link>
                    <IconButton component={Link} to="/cart" aria-label='Show car items' color='inherit'>
                        <Badge badgeContent={totalItems} color="secondary" overlap="rectangular">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
               )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
