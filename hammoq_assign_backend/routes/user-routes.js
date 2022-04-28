const express = require("express");

const userControllers = require("../controllers/user-controller");
const imageUpload = require("../middleware/image-upload");

const router = express.Router();

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);

router.post("/social", userControllers.socialAuth);

router.get("/getselecteduser/:userid", userControllers.getSelectedUser);

router.patch("/updateselecteduser", userControllers.updateUserProfile);

router.patch(
  "/updateimage/:userid",
  imageUpload.single("image"),
  userControllers.updateImage
);

module.exports = router;
