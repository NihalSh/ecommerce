import React from 'react';
import PropTypes from 'prop-types';

class DataInjector extends React.Component {
  
  init(props) {
    this.setState({
      data: null
    });
    this.fetchData(props.url);
  }
  
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  
  componentDidMount() {
    this.init(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }
  
  fetchData(url) {
    // TODO: replace with api call
    let shampoo = {
      id: '20ln12n',
      name: 'shampoo',
      description: 'cleans your hair',
      image:'/250x250.png',
    };
    let toothpaste = {
      id: 'o3unf2o',
      name: 'toothpaste',
      description: 'cleans your teeth',
      image:'/250x250.png',
    };
    
    fetch('api/products')
      .then((response) => {
	return response.json();
      })
      .then((data) => {
	if (url == 'products') {
	  this.setState({
	    data,
	  });
	} else if (url.startsWith('products')) {
	  let id = url.split('/')[1];
	  switch(id) {
	  case shampoo.id: this.setState({data: shampoo}); break;
	  case toothpaste.id: this.setState({data: toothpaste}); break;
	  }
	} else if (url.startsWith('reviews')) {
	  let id = url.split('/')[1];
	  switch(id) {
	  case shampoo.id: this.state.data = [
	    {
	      id: 'o3pnyult',
	      item_id: shampoo.id,
	      author: '3n09i3ue',
	      title: 'Very disappointed',
	      rating: 1,
	      text: 'Does not work on dogs',
	    },
	    {
	      id: 'o32nniet',
	      item_id: shampoo.id,
	      author: '33yun3ue',
	      title: 'Gives shiny hair!',
	      rating: 4,
	      text: 'Shiny shiny!',
	    },
	  ];
	    break;
	  case toothpaste.id: this.state.data = [
	    {
	      id: 'o3pnyult',
	      item_id:toothpaste.id,
	      author: '3n09i3ue',
	      title: 'Not excellent not bad',
	      rating: 3,
	      text: 'not mediocre not outstanding, only cleans teeth nothing else',
	    },
	  ];
	    break;
	  }
	  this.setState({data: this.state.data});
	} else {
	  console.error("unsupported url");
	}
      })
      .catch((err) => {
	console.error(err);
      });
    
  }
  
  render() {
    return this.state.data === null?
      (this.props.loadingIndicator? this.props.loadingIndicator : null) : this.props.children(this.state.data);
  }
}

DataInjector.propTypes = {
  url: PropTypes.string,
  loadingIndicator: PropTypes.func,
};

export default DataInjector;
