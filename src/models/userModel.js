const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
    
  },{timestamps:true});

  const userModel= mongoose.model("User",userSchema);
  
  module.exports = userModel
  
//   // Adoption Request Schema
//   const adoptionRequestSchema = new Schema({
//     userID: { type: Schema.Types.ObjectId, ref: 'User' },
//     petID: { type: Schema.Types.ObjectId, ref: 'Pet' },
//     status: { type: String, enum: ['pending', 'approved', 'rejected'] },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
//   });
  
//   // Log Schema
//   const logSchema = new Schema({
//     userID: { type: Schema.Types.ObjectId, ref: 'User' },
//     action: String,
//     entity: { type: String, enum: ['User', 'Pet', 'AdoptionRequest'] },
//     timestamp: { type: Date, default: Date.now }
//   });
  