import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    email: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    cvv: { type: Number, required: true },
    Earned: { type: Number, required: true },
    Profit: { type: Number, required: true },
    orderDate: { type: Date, required: true },
    Lost: { type: Number, required: true },
    products: [
      {
        productTitle: String,
        productColor: String,
        productCount: Number,
        productPrice: Number,
      },
    ],
  },
  { timestamps: true }
)

const Orders = mongoose.model('Orders', ordersSchema)

export default Orders
