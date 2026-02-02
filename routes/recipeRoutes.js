const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

router.get("/recipes/data", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.get("/recipes/data/:id", async (req, res) => {
  console.log(req.params.id)
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

router.post("/recipes", async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).json(recipe);
});

router.put("/recipes/:id", async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedRecipe);
});

router.delete("/recipes/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Recipe deleted" });
});

module.exports = router;