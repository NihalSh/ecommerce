import React from 'react';
import { connect } from 'react-redux';
import ProductDetails from '../components/ProductDetails';
import { getProductDetails } from '../actions/productDetails';

class ProductDetailsContainer extends React.Component {
  componentDidMount() {
    console.log(this.props);
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

const mapStateToProps = (state) => {
  return {
    desc: state.productDetails.description,
    image: state.productDetails.image,
    name: state.productDetails.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: getProductDetails(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsContainer);
