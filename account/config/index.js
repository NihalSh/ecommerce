if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongodb: {
      uri: 'mongodb://mongo/ecommerceAccount',
    },
  };
} else {
  module.exports = {
    mongodb: {
      uri: 'mongodb://localhost/ecommerceAccount',
    },
  };
}
