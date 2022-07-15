const { check } = require("express-validator");
exports.categoryCreateValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("image").isEmpty().withMessage("Image is required"),
  check("content").isLength({ min: 200 }).withMessage("minimum characters 200"),
];
exports.categoryUpdateValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("content").isLength({ min: 200 }).withMessage("minimum characters 200"),
];
