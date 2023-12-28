const petModel = require("../models/petModel");
const userModel = require("../models/userModel");

const getAllPets = async (req, res) => {
    try {
      const currUser=await userModel.findById(req.userId) //await important
      const userType=currUser.role

      const pets = await ( userType=== "admin" ? await petModel.find() : await petModel.find({ adopted: false }));//for diiffret role admin/user
      
      return res.status(200).json(pets);
    } catch (error) {
      console.error(error);
      return res.status(400).json({message:'Error retrieving pets'});
    }
  }

const addPet =  async (req, res) => {
    try {
      const pet = new petModel(req.body);//or destructure body
      await pet.save();
      return res.status(201).json(pet);
    } catch (error) {
      console.error(error);
      return res.status(400).json({message:'Error creating pet'});
    }
  }

const updatePet = async (req, res) => {
    try {
      const pet = await petModel.findByIdAndUpdate(req.params.petId, req.body, { new: true }); //param.petId is same as provided /pets/:petId
      if (!pet) {
        res.status(404).json({message:'Pet not found'});
      } else {
        res.status(200).json(pet);
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({message:'Error updating pet'});
    }
  }

  const deletePet = async (req, res) => {
    try {
      await petModel.findByIdAndDelete(req.params.petId);   //make sure /pets/:petId in router
      res.json({ message: 'Pet deleted' });
    } catch (error) {
      console.error(error);
      res.status(404).json({message:'error deleting pet'});
    }
  }

  module.exports ={
    getAllPets,
    addPet,
    updatePet,
    deletePet
  }