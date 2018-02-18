import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';


const GridListView = (props) => {
    if (props.data.length === 0) return <span style={props.style}>no items</span>;

    const items = props.data.map((entry) =>
				 React.createElement(props.itemClass,
						     {...entry,
						      url:props.detail_url
						     }
						    )
				);

    const gridItems = items.map((item, i) => <Grid item xs={12} sm={3} key={i}>{item}</Grid>); 

    return (
	<Grid container spacing={24}>
	  {gridItems}
	</Grid>
    );
};

GridListView.propTypes = {
    itemClass: PropTypes.func,
    detail_url: PropTypes.string,
    data: PropTypes.array
};

export default GridListView;





