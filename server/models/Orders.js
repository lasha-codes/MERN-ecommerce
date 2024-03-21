import mongoose from 'mongoose'

const ordersSchema = new mongoose.Schema({
  status: { type: String, required: true },
  email: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  cvv: { type: Number, required: true },
  checkedOut: { type: Number, required: true },
  products: [{ productName: { type: String, required: true } }],
})

const Orders = mongoose.model('Orders', ordersSchema)

export default Orders
