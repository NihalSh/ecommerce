import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductDetails from '../components/ProductDetails';
import { getProductDetails } from '../actions/productDetails';

class ProductDetailsContainer extends React.Component {
  componentDidMount() {
    this.props.onMount(this.props.match.params.id);
  }

  render() {
    return (
      this.props.id
        ?
          <ProductDetails
            desc={this.props.desc}
            id={this.props.id}
            image={this.props.image}
            name={this.props.name}
          />
        : null
    );
  }
}

ProductDetailsContainer.defaultProps = {
  desc: null,
  id: null,
  image: null,
  name: null,
};

ProductDetailsContainer.propTypes = {
  desc: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMount: PropTypes.func.isRequired,
};

const handleMount = dispatch => (productId) => {
  getProductDetails(dispatch, productId);
};

const mapStateToProps = state => ({
  desc: state.productDetails.description,
  id: state.productDetails.id,
  image: state.productDetails.image,
  name: state.productDetails.name,
});

const mapDispatchToProps = dispatch => ({
  onMount: handleMount(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsContainer);
