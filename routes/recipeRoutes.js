const express = require("express");
const Recipe = require("../models/Recipe");

const router = express.Router();

/* ---------- GET ALL RECIPES ---------- */
router.get("/recipes/data", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});



/* ---------- GET ONE RECIPE ---------- */
router.get("/recipes/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

/* ---------- CREATE RECIPE ---------- */
router.post("/recipes", async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).json(recipe);
});

/* ---------- UPDATE RECIPE ---------- */
router.put("/recipes/:id", async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedRecipe);
});

/* ---------- DELETE RECIPE ---------- */
router.delete("/recipes/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Recipe deleted" });
});

module.exports = router;
