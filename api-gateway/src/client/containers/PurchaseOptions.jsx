import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PurchaseOptions from '../components/PurchaseOptions';
import { addBuyingOptions, getBuyingOptions } from '../actions/productDetails';
import AddBuyingOption from '../components/AddBuyingOptionForm';

class PurchaseOptionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.onMount(this.props.id);
  }

  handleSubmit(data) {
    const fullData = {
      item_id: this.props.id,
      seller_id: this.props.user,
      ...data,
    };
    this.props.onAddBuyingOption(fullData);
  }
  render() {
    return (
      <React.Fragment>
        {
          this.props.isSeller
            ? <AddBuyingOption onSubmit={this.handleSubmit} />
            : null
        }
        {
          this.props.data.length > 0
            ?
              <React.Fragment>
                <PurchaseOptions
                  data={this.props.data}
                />
              </React.Fragment>
            : null
        }
      </React.Fragment>
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
  isSeller: PropTypes.bool.isRequired,
  onAddBuyingOption: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

const handleAddBuyingOption = dispatch => (data) => {
  addBuyingOptions(dispatch, data);
};

const handleMount = dispatch => (id) => {
  getBuyingOptions(dispatch, id);
};

const mapStateToProps = state => ({
  data: state.productDetails.buyingOptions.data,
  isSeller: state.account.roles.includes('seller'),
  user: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  onAddBuyingOption: handleAddBuyingOption(dispatch),
  onMount: handleMount(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PurchaseOptionsContainer);
