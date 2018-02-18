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
	if (this.props.url == 'products') {
	    this.setState({
		data: [
		    {
			id: '20ln12n',
			name: 'shampoo',
			description: 'cleans your hair',
			image:'/250x250.png',
		    },
		    {
			id: 'o3unf2o',
			name: 'toothpaste',
			description: 'cleans your teeth',
			image:'/250x250.png',
		    },
		],
	    });
	} else {
	    console.error("unsupported url");
	}
    }

    render() {
	return this.state.data === null? this.props.loadingIndicator : this.props.children(this.state.data);
    }
    

}

DataInjector.propTypes = {
    url: PropTypes.string,
    loadingIndicator: PropTypes.func,
};

export default DataInjector;
