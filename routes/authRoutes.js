const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Model = mongoose.model("Model");
const Count = mongoose.model("Count");

let data = [];

router.post("/add", async (req, res) => {
  data = req.body;

  const newDocument = new Model(data);

  await newDocument.save();

  let doc = await Count.findOne();

  console.log(doc);

  doc.count += 1;
  await doc.save();

  res.status(200).send({ message: "Data added successfully" });
});

router.put("/update", async (req, res) => {
  const data = req.body;

  const latestDocument = await Model.findOne({ id: data.id });

  if (!latestDocument) {
    res.status(404).send({
      message: "Data not found",
    });
  }

  latestDocument.set(data);

  await latestDocument.save();

  let doc = await Count.findOne();

  if (doc) {
    doc.count += 1;
    await doc.save();
  } else {
    doc = new Count();
    await doc.save();
  }

  res.status(200).send({
    message: "Data updated successfully",
    updatedData: latestDocument,
  });
});

router.get("/get", async (req, res) => {
  const allData = await Model.find();

  res.json(allData);
});

router.get("/count", async (req, res) => {
  const allCount = await Count.find();

  res.json(allCount);
});

module.exports = router;
