import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductDetails from '../components/ProductDetails';
import getProductDetails from '../actions/productDetails';

class ProductDetailsContainer extends React.Component {
  componentDidMount() {
    this.props.onMount(this.props.match.params.id);
  }

  render() {
    return (
      <ProductDetails
        desc={this.props.desc}
        image={this.props.image}
        name={this.props.name}
      />
    );
  }
}

ProductDetailsContainer.propTypes = {
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  desc: state.productDetails.description,
  image: state.productDetails.image,
  name: state.productDetails.name,
});

const mapDispatchToProps = dispatch => ({
  onMount: getProductDetails(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsContainer);
