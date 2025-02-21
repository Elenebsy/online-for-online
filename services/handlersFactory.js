const asyncHandler = require('express-async-handler');


exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    

    if (!document) {
      return res.status(404).json({ msg: `No document for this id ${id}` });
    }

    document.remove();
    res.status(204).json({ 
      status: "success",
      data: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!document) {
      return res.status(404).json({ msg: `No document for this id ${id}` });
    }
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ 
      status: "success",
      data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ 
      status: "success",
      data: newDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document=await Model.findById(id); ;

    if (!document) {
      return res.status(404).json({ msg: `No document for this id ${id}` });
    }
    res.status(200).json({ 
      status: "success",
      data: document 
    });
  });

exports.getAll = (Model) =>
    asyncHandler(async (req, res) => {
      const documents = await Model.find();
  
      res.status(200).json({
        status: "success",
        results: documents.length,
        data: documents,
      });
  });
