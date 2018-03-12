import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import GridListView from './GridListView';
import ProductCard from './ProductCard';
import DataInjector from './DataInjector';
import { CircularProgress } from 'material-ui/Progress';

// TODO change `key` to url so it is unique and related too
const Products = (props) => {
    return (
		<Grid container spacing={24}>
      {props.items.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <ProductCard {...item} url="products" />
        </Grid>
      ))}
		</Grid>
    );
};

Products.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
		})
	),
}

export default Products;
