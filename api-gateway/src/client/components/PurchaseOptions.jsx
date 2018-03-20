import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';

const Shadow = styled.div`
  box-shadow: 0.05em 0.05em 0.15em grey;
  margin-top: 1em;
`;

const PurchaseOptions = props => (
  <React.Fragment>
    <Typography variant="title" component="h2">Buying Options</Typography>
    <Shadow>
      <List component="nav">
        {
          props.data.map(value => (
            <ListItem key={value.name} button onClick={() => (console.log('#TODO buy'))}>
              <ListItemText primary={`\u20B9${value.price} - ${value.name}`} />
            </ListItem>
          ))
        }
      </List>
    </Shadow>
  </React.Fragment>
);

PurchaseOptions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default PurchaseOptions;
