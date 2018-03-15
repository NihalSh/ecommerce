import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import DataInjector from './DataInjector';
import { CircularProgress } from 'material-ui/Progress';

const ProductDetailPage = (props) => {
    const id = props.match.params.id;
    console.log(id);
    return (
	<div>
	  <DataInjector url={'products/' + id} loadingIndicator={CircularProgress}>
	    {(data) =>
		<div>
		      <Typography variant="title" component="h1">{data.name}</Typography>
			  <img src="/650x350.png" />
			    <Typography paragraph={true}>{data.text}</Typography>
		    </div>
		}
	  </DataInjector>
	  <Typography variant="title" component="h2">Reviews</Typography>
	  <DataInjector url={'reviews/' + id} loadingIndicator={CircularProgress}>
	    {(data) =>
		data.map((review, i) =>
			 <div key={i}>
			       <Typography variant="title" component="h3">{review.title}</Typography>
			     <Typography>Rating: {review.rating}</Typography>
				 <Typography paragraph={true}>{review.text}</Typography>
			 </div>
			) 
	    }
	</DataInjector>
	</div>
    );
};

export default ProductDetailPage;









