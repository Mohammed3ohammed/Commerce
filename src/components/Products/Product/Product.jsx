import React from 'react';
import { Card, CardMedia, CardContent, CardActions,  IconButton, Typography } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const Product = () => {
    const classes = useStyles(); 
  return (
    <Card className={classes.CardContent}>
        <CardMedia className={classes.CardMedia}  image={Product.image} title={Product.name} />
        <CardContent>
            <div className={classes.CardContent}>
                <Typography variant="h5" gutterBottom>
                    {Product.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {Product.price}
                </Typography>
            </div>
            <Typography variant='body2' color='textSecondary'>{Product.description}</Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.CardActions}>
            <IconButton aria-label="Add to Card">
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product;
