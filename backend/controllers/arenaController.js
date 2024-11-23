const Arena = require('../models/Arena');

exports.createArena = async (req, res) => {
  try {
    const newArena = new Arena(req.body);
    const savedArena = await newArena.save();
    res.status(201).json(savedArena);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getArenas = async (req, res) => {
  try {
    const arenas = await Arena.find();
    res.status(200).json(arenas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
