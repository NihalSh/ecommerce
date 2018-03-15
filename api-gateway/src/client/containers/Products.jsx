import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Products from '../components/Products';
import getProducts from '../actions/products';

const handleOnMount = dispatch => () => {
  getProducts(dispatch);
};

class ProductsContainer extends React.Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    return (this.props.items.length > 0
      ? <Products items={this.props.items} />
      : 'No products found'
    );
  }
}

ProductsContainer.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  onMount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.products.data,
});

const mapDispatchToProps = dispatch => ({
  onMount: handleOnMount(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
