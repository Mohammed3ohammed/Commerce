import React from 'react';
import { Card, CardMedia, CardContent, CardActions,  IconButton, Typography } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const Product = ( {product, onAddToCart} ) => {
    const classes = useStyles(); 
   
const handleAddToCart = () => onAddToCart(product.id, 1);

  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media}  image={product.media.source} title={product.name} />
        <CardContent>
            <div className={classes.cardContent}>
                <Typography  variant="h5" gutterBottom component="h2">
                    {product.name}
                </Typography>
                <Typography gutterBottom variant="h5 " component="h5"> 
                    ${product.price.formatted_with_symbol}
                </Typography>
            </div>
            <Typography dangerouslySetInnerHTML={{__html: product.description}}  variant='body2' color='textSecondary' component="p" />
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add to Card"  onClick={handleAddToCart}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  );
};

export default Product;
