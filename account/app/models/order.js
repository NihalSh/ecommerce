const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userid: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

class OrderClass {
  static findByOrderId(orderId) {
    return this.findOne({ orderId });
  }
}

orderSchema.loadClass(OrderClass);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
