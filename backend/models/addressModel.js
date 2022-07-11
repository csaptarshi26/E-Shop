import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name : { type: String, required: true },
  mobileNum : { type: String, required: true },
  locality : { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  landmark : { type: String },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, {
  timestamps: true
})

const Address = mongoose.model("Address", addressSchema);

export default Address