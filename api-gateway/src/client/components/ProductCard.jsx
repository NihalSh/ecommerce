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
    margin: 'auto',
  },
  media: {
    height: 250,
  },
};

const MediaCard = (props) => {
  const {
    classes, image, name, description, url, id,
  } = props;
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
          <Button
            size="small"
            color="primary"
            component={Link}
            to={`${url}/${id}`}
          >
            More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

MediaCard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(styles)(MediaCard);
