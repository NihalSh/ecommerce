import { combineReducers } from 'redux';
import productDetails from './productDetails';
import products from './products';
import user from './user';

export default combineReducers({
  productDetails,
  products,
  user,
});
