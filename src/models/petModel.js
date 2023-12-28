const mongoose = require('mongoose');

  // Pet Schema
  const petSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['Dog', 'Cat', 'Other'], 
        required: true 
    },
    age: { 
        type: Number 
    },
    adopted: { type: Boolean, 
        default: false }, // Default to not adopted
    
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' //same as defined suring creation of schema const
    }
  },{timestamps:true})

  const petModel = mongoose.model('Pet', petSchema);
  module.exports = petModel;
