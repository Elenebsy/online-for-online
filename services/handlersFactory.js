const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = model.findOneAndDelete({ _id: id });

    if (!document) {
      return res.status(404).json({ msg: `No document for this id ${id}` });
    }

    document.remove();
    res.status(204).send({ msg: "Document deleted" });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const document = await model.findOneAndUpdate({ _id: id }, body);

    if (!document) {
      return res.status(404).json({ msg: `No document for this id ${id}` });
    }
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const body = req.body;
    const newDoc = await model.create(body);
    newDoc.save();
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findOne({ _id: id });

    if (!document) {
      return res.status(404).json({ msg: `No document for this id ${id}` });
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const documents = await model.find();

    res.status(200).json({ data: documents });
  });
