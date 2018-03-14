import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import styled from 'styled-components';

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

const ProductDetails = ({ name='name', image='/650x350.png', desc='text' }) => {
  return (
    <div>
      <section>
        <PageStyle>
          <Typography variant="title" component="h1">{name}</Typography>
          <Image src={image} />
          <Typography paragraph>{desc}</Typography>
        </PageStyle>
      </section>
    </div>
  );
};

export default ProductDetails;
