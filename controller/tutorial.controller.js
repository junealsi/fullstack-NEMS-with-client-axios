const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// create and save a new tutorial
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // create and grab a tutorial data
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // save tutorial into database
  Tutorial.create(tutorial)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Can not save the tutorial",
      });
    });
};

// retrieve all tutorials from database with condition
exports.findAll = (req, res) => {
  const title = req.query.title; //get query string from the Request
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not get the tutorials",
      });
    });
};

// retrieve a single tutorial with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      if (!data) res.send({ message: "The tutorial not found " });
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: `Could get the tutorial with id ${id}` });
    });
};

// update a tutorial identified by id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Tutorial updated successfully" });
      }
      res.send({
        message: `Could not update tutorial with id ${id}. Make sure the tutorial exist or req.body is not empty`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating tutorial with id ${id}`,
      });
    });
};

// delete a tutorial with specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Tutorial deleted successfully" });
      }
      res.send({
        message: `Could not delete tutorial. Make sure it exist`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete tutorial with ${id}`,
      });
    });
};

// delete all tutorials
exports.deleteAll = (req, res) => {
  Tutorial.destroy({ where: {}, truncate: false })
    .then((nums) =>
      res.send({ message: `${nums} tutorials deleted successfully` })
    )
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error removing all tutorials",
      });
    });
};

// find all published tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Could not find the tutorials" });
    });
};
