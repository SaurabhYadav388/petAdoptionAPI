const express = require("express");
const { getAllPets, addPet, deletePet, updatePet } = require("../controllers/petController");
const {authLoggedIn,authAdmin} = require("../middlewares/auth");
const petRouter = express.Router();

petRouter.get("/", authLoggedIn , getAllPets) //no authadmin as done inside

petRouter.post("/", authLoggedIn , authAdmin , addPet)

petRouter.delete("/:petId", authLoggedIn , authAdmin , deletePet)

petRouter.put("/:petId", authLoggedIn , authAdmin , updatePet)

module.exports=petRouter