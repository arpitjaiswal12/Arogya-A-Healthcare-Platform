const express = require("express");
const router = express.Router();
const {
  updateDoctorProfile,
  getAllDoctors,
  getMedicines,
  searchDoctors,
  deleteDoctor,
  deletePatient,
} = require("../controllers/User.js");

router.post("/update-profile/:id", updateDoctorProfile);
router.get("/doctors", getAllDoctors);
router.get("/medicines", getMedicines);
router.get("/search-doctors", searchDoctors);

router.delete("/doctors/:userId", deleteDoctor);
router.delete("/patients/:userId", deletePatient);

module.exports = router;
