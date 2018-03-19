import React from 'react';
import PropTypes from 'prop-types';

const AddProduct = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', event.target[0].value);
    formData.append('description', event.target[1].value);
    formData.append('image', event.target[2].files[0]);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
      <div>
        <label htmlFor="name">
          Name
          <input type="text" name="name" />
        </label>
        <br />
        <label htmlFor="description">
          Description
          <input type="text" name="description" />
        </label>
        <br />
        <label htmlFor="file">
          Choose file to upload
          <input type="file" id="file" name="file" />
        </label>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
};

AddProduct.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddProduct;
