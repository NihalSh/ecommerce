import React from 'react';
import { connect } from 'react-redux';
import Products from '../components/Products';
import { getProducts } from '../actions/products';

const handleOnMount = (dispatch) => () => {
	getProducts(dispatch);
};

class ProductsContainer extends React.Component {
	componentDidMount() {
		this.props.onMount();
	}
	render() {
		return (this.props.items.length > 0
			? <Products items={this.props.items} />
			: "No products found"
		);
	}
}


const mapStateToProps = (state) => {
  return {
    items: state.products.data,
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
		onMount: handleOnMount(dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
