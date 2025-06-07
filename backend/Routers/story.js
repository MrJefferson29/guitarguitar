// routes/story.js
const express = require("express");
const {
  addStory,
  getAllStories,
  detailStory,
  likeStory,
  editStory,
  deleteStory,
  editStoryPage,
} = require("../Controllers/story");
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const { checkStoryExist, checkUserAndStoryExist } = require("../Middlewares/database/databaseErrorhandler");
const multer = require("multer");
const router = express.Router();

// Use memory storage so we can read file.buffer directly:
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /story/addstory
// - up to 5 images (field name "my_files")
// - must be authenticated
router.post(
  "/addstory",
  [getAccessToRoute, upload.array("my_files", 5)],
  addStory
);

// POST /story/:slug
// - get story details (public), can pass activeUser in body to get likeStatus
router.post("/:slug", checkStoryExist, detailStory);

// POST /story/:slug/like
// - like/unlike a story
router.post("/:slug/like", [getAccessToRoute, checkStoryExist], likeStory);

// GET /story/editStory/:slug
// - get story for editing (populated), only owner
router.get(
  "/editStory/:slug",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  editStoryPage
);

// PUT /story/:slug/edit
// - update story fields + up to 5 images
router.put(
  "/:slug/edit",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist, upload.array("my_files", 5)],
  editStory
);

// DELETE /story/:slug/delete
// - delete story + images + comments
router.delete(
  "/:slug/delete",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  deleteStory
);

// GET /story/getAllStories
router.get("/getAllStories", getAllStories);

module.exports = router;
