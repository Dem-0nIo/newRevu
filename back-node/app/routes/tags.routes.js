const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags.controller');

// Route to get all departments
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.get("/api/categories-with-subcategories", tagsController.getCategoriesWithSubcategories);
    app.post("/api/categories", tagsController.createCategory);
    app.post("/api/subcategories", tagsController.createSubcategory);
};