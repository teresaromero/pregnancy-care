const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const businessSchema = new Schema({
  name: { type: String, required: true },
  VAT: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true }
  },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  owner: [{ type: Schema.Types.ObjectId, ref:'User' }]
}, {
  timestamps: true
});

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;
