const Items = require("../models/ItemModel");
const AskItems = require("../models/AskModel");

const getAllItems = async (req, res) => {
  try {
    const items = await Items.find({});
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};

const createSingleItem = async (req, res) => {
  try {
    const item = new Items({
      type: req.body.type,
      quantity: req.body.quantity,
      description: req.body.description,
      condition: req.body.condition,
      location: req.body.location,
      zipcode: req.body.zipcode,
      postType: req.body.postType,
      _uid: req.body._uid,
    });

    console.log(req.body, "BODIED");

    await item.save((err, post) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json(post);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};

const getFilteredItems = async (req, res) => {
  try {
    var queryObj = {};

    if (req.query.type.length > 0) {
      queryObj.type = req.query.type;
    }
    if (req.query.quantity > 0) {
      queryObj.quantity = { $gte: Number(req.query.quantity) };
    }
    if (req.query.condition.length > 0) {
      queryObj.condition = req.query.condition;
    }
    if (req.query.location.length > 0) {
      queryObj.location = req.query.location;
    }
    if (req.query.zipcode.length > 0) {
      queryObj.zipcode = req.query.zipcode;
    }
    console.log(queryObj);
    const filteredItems = await Items.find(queryObj);
    res.status(200).json(filteredItems);
  } catch (e) {
    console.log(e);
  }
};

const postAskItem = async (req, res) => {
  try {
    const askItem = new AskItems({
      who: req.body.who,
      type: req.body.type,
      quantity: req.body.quantity,
      condition: req.body.condition,
      location: req.body.location,
      zipcode: req.body.zipcode,
      postType: req.body.postType,
      _uid: req.body._uid,
    });

    await askItem.save((err, post) => {
      if (err) {
        console.log(err);
        return;
      }
      res.status(201).json(post);
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Error" });
  }
};

const getSingleItem = async (req, res) => {
  try {
    const id = req.query[0];
    const modalItem = await Items.findById(id);
    res.status(200).json(modalItem)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};
// NOT YET IMPLEMENTED =======================

const editSingleItem = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};
const deleteSingleItem = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};

const getAccountItems = async (req,res) => {
  const accountItems = await Items.find(req.query);
  res.status(200).json(accountItems)
}

const getAccountItemsAsked = async (req,res) => {
    const accountItems = await AskItems.find(req.query);
    res.status(200).json(accountItems)
}

module.exports = {
  getAllItems,
  getSingleItem,
  createSingleItem,
  editSingleItem,
  deleteSingleItem,
  getFilteredItems,
  postAskItem,
  getAccountItems,
  getAccountItemsAsked,
};
