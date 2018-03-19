import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import AddProductForm from './AddProductForm';
import ProductCard from './ProductCard';

// TODO change `key` to url so it is unique and related too
const Products = props => (
  <React.Fragment >
    <AddProductForm onSubmit={props.onAddProduct} />
    <Grid container spacing={24}>
      {props.items.map(item => (
        <Grid item xs={12} sm={3} key={item.id}>
          <ProductCard {...item} url="products" />
        </Grid>
      ))}
    </Grid>
  </React.Fragment>
);

Products.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  })).isRequired,
  onAddProduct: PropTypes.func.isRequired,
};

export default Products;
