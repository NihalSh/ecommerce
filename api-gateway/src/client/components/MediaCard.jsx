import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

const styles = {
  card: {
    maxWidth: 250,
  },
  media: {
    height: 250,
  },
};

const MediaCard = (props) => {
    const { classes, image, name, description, url, id } = props;
    return (
	<div>
	  <Card className={classes.card}>
	    <CardMedia
	      className={classes.media}
	      image={image}
	      name={name} 
	      />
	    <CardContent>
	      <Typography variant="headline" component="h2">
		{name}
	      </Typography>
	      <Typography component="p">
		{description}
	      </Typography>
	    </CardContent>
	    <CardActions>
	      <Button size="small" color="primary" component={Link} to={url + '/' + id}>
		More
	      </Button>
	    </CardActions>
	  </Card>
	</div>
    );
} 

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
};

export default withStyles(styles)(MediaCard);
