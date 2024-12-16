const Cat = require("../models/cat.js");

const getCats = async (req, res) => {
    try {
        const cats = await Cat.find();
        res.status(200).json({ statusCode: 200, data: cats });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
};

const createCat = async (req, res) => {
    try {
        const cat = new Cat(req.body);
        await cat.save();
        res.status(201).json({ statusCode: 201, message: "Cat created" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
};

const deleteCat = async (req, res) => {
    try {
        await Cat.findByIdAndDelete(req.params.id);
        res.status(200).json({ statusCode: 200, message: "Cat deleted" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
    }
};

module.exports = { getCats, createCat, deleteCat };
