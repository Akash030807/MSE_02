const express = require("express");
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// ADD ITEM
router.post("/", auth, async (req, res) => {
  const item = await Item.create({ ...req.body, user: req.user });
  res.json(item);
});

// GET ALL
router.get("/", async (req, res) => {
  const items = await Item.find().populate("user", "name email");
  res.json(items);
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user)
    return res.status(403).json({ msg: "Not allowed" });

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user)
    return res.status(403).json({ msg: "Not allowed" });

  await item.deleteOne();
  res.json({ msg: "Deleted" });
});

// SEARCH
router.get("/search", async (req, res) => {
  const { name } = req.query;
  const items = await Item.find({
    itemName: { $regex: name, $options: "i" }
  });
  res.json(items);
});

module.exports = router;