import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddProductForm from '../components/AddProductForm';
import Products from '../components/Products';
import addProduct from '../actions/addProduct';
import getProducts from '../actions/products';

const handleOnMount = dispatch => () => {
  getProducts(dispatch);
};

const handleAddProduct = dispatch => (formData) => {
  addProduct(dispatch, formData);
};

class ProductsContainer extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return (
      <React.Fragment>
        {
          this.props.isSeller
            ? <AddProductForm onSubmit={this.props.onAddProduct} />
            : null
        }
        {
          this.props.items.length > 0
          ?
            <Products
              items={this.props.items}
            />
          : 'No products found'
        }
      </React.Fragment>
    );
  }
}

ProductsContainer.propTypes = {
  isSeller: PropTypes.bool.isRequired,
  items: PropTypes.instanceOf(Array).isRequired,
  onAddProduct: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isSeller: state.account.roles.includes('seller'),
  items: state.products.data,
});

const mapDispatchToProps = dispatch => ({
  onMount: handleOnMount(dispatch),
  onAddProduct: handleAddProduct(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
