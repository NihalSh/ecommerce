import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';
import PurchaseOptions from '../containers/PurchaseOptions';

const PageStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1em;
`;

const Image = styled.img`
  display: block;
  max-width: 350px;
  max-height: 650px;
  width: auto;
  height: auto;
`;

const ProductDetails = ({
  name, id, image, desc,
}) => (
  <div>
    <section>
      <PageStyle>
        <Typography variant="title" component="h1">{name}</Typography>
        <Image src={image} />
        <Typography paragraph>{desc}</Typography>
        <br />
        <PurchaseOptions id={id} />
      </PageStyle>
    </section>
  </div>
);

ProductDetails.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default ProductDetails;
