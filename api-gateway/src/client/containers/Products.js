import { connect } from 'react-redux';
import Products from '../components/Products';

const mockData = [{
	    id: '20ln12n',
	    name: 'advanced shampoo',
	    description: 'cleans your hair',
	    image:'/250x250.png',
	},
	{
	    id: 'o3unf2o',
	    name: 'toothpaste',
	    description: 'cleans your teeth',
	    image:'/250x250.png',
	}
];

const mapStateToProps = (state) => {
  return {
    items: mockData,
  };
};

export default connect(mapStateToProps, null)(Products);
