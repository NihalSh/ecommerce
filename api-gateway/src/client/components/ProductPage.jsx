import React from 'react';
import GridListView from './GridListView';
import MediaCard from './MediaCard';
import DataInjector from './DataInjector';
import { CircularProgress } from 'material-ui/Progress';

const ProductPage = (props) => {
    return (
	<DataInjector url="productsUrl" loadingIndicator={CircularProgress}>
	  {(data) => <GridListView data={data} itemClass={MediaCard} detail_url="products" />} 
	</DataInjector>
    );
};

export default ProductPage;
