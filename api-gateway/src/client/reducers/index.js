import { combineReducers } from 'redux';
import account from './account';
import productDetails from './productDetails';
import products from './products';
import user from './user';

export default combineReducers({
  account,
  productDetails,
  products,
  user,
});
