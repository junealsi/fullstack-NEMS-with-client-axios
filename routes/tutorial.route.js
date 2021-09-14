module.exports = (app) => {
  const tutorials = require("../controller/tutorial.controller");

  const router = require("express").Router();

  // create new
  router.post("/", tutorials.create);
  // get all tutorials
  router.get("/", tutorials.findAll);
  // get published tutorials
  router.get("/published", tutorials.findAllPublished);
  // get single tutorial
  router.get("/:id", tutorials.findOne);
  // update tutorial
  router.put("/:id", tutorials.update);
  // delete a tutorial
  router.delete("/:id", tutorials.delete);
  // delete all tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
