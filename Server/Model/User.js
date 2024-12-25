const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },  
  externalId: { type: String, unique: true }, 
  role: { type: String, default: "user" }, 
  timestamps: true, 
});

module.exports = mongoose.model('User', UserSchema);
