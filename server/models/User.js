const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true ,lowercase:true},
  password: { type: String, required: true },
  gender: {type:String, enum:["Male","Female"], required:true},
  role: {
    type: String,
    enum : ['ADMIN', 'CUSTOMER', 'EMPLOYEE'],
    default: 'ADMIN'
  },
  confirmationCode: String,
  isActive: { type: Boolean, default: false },
  business: [{ type: Schema.Types.ObjectId, ref:'Business' }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
