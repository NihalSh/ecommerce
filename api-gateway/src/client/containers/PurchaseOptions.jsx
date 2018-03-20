import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PurchaseOptions from '../components/PurchaseOptions';
import { getBuyingOptions } from '../actions/productDetails';

class PurchaseOptionsContainer extends React.Component {
  componentDidMount() {
    this.props.onMount(this.props.id);
  }

  render() {
    return (
      this.props.data.length > 0
        ? <PurchaseOptions data={this.props.data} />
        : null
    );
  }
}

PurchaseOptionsContainer.defaultProps = {
  data: [],
};

PurchaseOptionsContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })),
  id: PropTypes.string.isRequired,
  onMount: PropTypes.func.isRequired,
};

const handleMount = dispatch => (id) => {
  getBuyingOptions(dispatch, id);
};

const mapStateToProps = state => ({
  data: state.productDetails.buyingOptions.data,
});

const mapDispatchToProps = dispatch => ({
  onMount: handleMount(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PurchaseOptionsContainer);
