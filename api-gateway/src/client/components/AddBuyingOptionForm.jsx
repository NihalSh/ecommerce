import React from 'react';
import PropTypes from 'prop-types';

const AddBuyingOption = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      price: event.target[0].value,
      quantity: event.target[1].value,
    };
    onSubmit(data);
  };

  return (
    <React.Fragment>
      <header>Add Buying Option</header>
      <form onSubmit={handleSubmit} method="post">
        <div>
          <label htmlFor="price">
            Price &#x20B9;
            <input type="number" name="price" />
          </label>
          <br />
          <label htmlFor="quantity">
            Quantity
            <input type="number" name="number" />
          </label>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </React.Fragment>
  );
};

AddBuyingOption.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddBuyingOption;
