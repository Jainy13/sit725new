const express = require("express");
const { getCats, createCat, deleteCat } = require("../controllers/catController");
const router = express.Router();

router.get("/", getCats);
router.post("/", createCat);
router.delete("/:id", deleteCat);

module.exports = router;
