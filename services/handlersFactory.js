const asyncHandler = require('express-async-handler');


exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = "";

    if (!document) {
      return res.status(404).json({ msg: `No document for this id ${id}` });
    }

    document.remove();
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document ="";

    if (!document) {
      return res.status(404).json({ msg: `No document for this id ${id}` });
    }
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = "";
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document="" ;

    if (!document) {
      return res.status(404).json({ msg: `No document for this id ${id}` });
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
  
    const documents="" ;

      res.status(200).json({ data: documents });
  });
