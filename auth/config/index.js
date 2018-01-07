if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongodb: {
      uri: 'mongodb://mongo/ecommerceAuth',
    },
    jwt: {
      secret: 'not a big secret',
    },
  };
} else {
  module.exports = {
    mongodb: {
      uri: 'mongodb://localhost/ecommerceAuth',
    },
    jwt: {
      secret: 'not a big secret',
    },
  };
}
