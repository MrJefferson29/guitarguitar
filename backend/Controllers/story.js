// controllers/story.js
const asyncErrorWrapper = require("express-async-handler");
const Story = require("../Models/story");
const deleteImageFile = require("../Helpers/Libraries/deleteImageFile");
const { searchHelper, paginateHelper } = require("../Helpers/query/queryHelpers");
const cloudinary = require("cloudinary").v2;

// Helper: upload a single file buffer to Cloudinary, return secure_url
const handleUpload = async (fileBuffer, mimetype) => {
  const b64 = Buffer.from(fileBuffer).toString("base64");
  const dataURI = `data:${mimetype};base64,${b64}`;
  const res = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });
  return res.secure_url;
};

// @desc    Add a new story with up to 5 images
// @route   POST /story/addstory
// @access  Private
const addStory = asyncErrorWrapper(async (req, res, next) => {
  const { title, content, price, category } = req.body;

  // If no files were uploaded:
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Please upload at least one image." });
  }

  // If user tries to upload more than 5 files:
  if (req.files.length > 5) {
    return res
      .status(400)
      .json({ error: "You can upload a maximum of 5 images per story." });
  }

  // Compute readtime from word count:
  const wordCount = content.trim().split(/\s+/).length;
  const readtime = Math.floor(wordCount / 200) || 1;

  try {
    // Upload each file to Cloudinary, collect URLs
    const imageUploadPromises = req.files.map((file) =>
      handleUpload(file.buffer, file.mimetype)
    );
    const imageUrls = await Promise.all(imageUploadPromises);

    // Create new story, saving imageUrls array
    const newStory = await Story.create({
      title,
      content,
      price,
      category,
      author: req.user._id,
      readtime,
      imageUrls, // array of up to 5 Cloudinary URLs
    });

    return res.status(200).json({
      success: true,
      message: "Story added successfully",
      data: newStory,
    });
  } catch (error) {
    console.error("Error adding story:", error);
    return next(error);
  }
});

// @desc    Get all stories (with optional search & pagination)
// @route   GET /story/getAllStories
// @access  Public
const getAllStories = asyncErrorWrapper(async (req, res, next) => {
  let query = Story.find();
  query = searchHelper("title", "category", query, req);
  const paginationResult = await paginateHelper(Story, query, req);
  query = paginationResult.query;
  // Sort by likeCount, commentCount, and recency:
  query = query.sort("-likeCount -commentCount -createdAt");
  const stories = await query;

  return res.status(200).json({
    success: true,
    count: stories.length,
    data: stories,
    page: paginationResult.page,
    pages: paginationResult.pages,
  });
});

// @desc    Get details of a single story by slug, including likeStatus
// @route   POST /story/:slug
// @access  Public (but can accept activeUser in body to check like status)
const detailStory = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;
  const { activeUser } = req.body;

  const story = await Story.findOne({ slug }).populate("author likes");
  if (!story) {
    return res.status(404).json({ success: false, error: "Story not found." });
  }

  const storyLikeUserIds = story.likes.map((u) => u._id.toString());
  const likeStatus = activeUser
    ? storyLikeUserIds.includes(activeUser._id)
    : false;

  return res.status(200).json({
    success: true,
    data: story,
    likeStatus,
  });
});

// @desc    Like or unlike a story
// @route   POST /story/:slug/like
// @access  Private
const likeStory = asyncErrorWrapper(async (req, res, next) => {
  const { activeUser } = req.body;
  const { slug } = req.params;

  const story = await Story.findOne({ slug }).populate("author likes");
  if (!story) {
    return res.status(404).json({ success: false, error: "Story not found." });
  }

  const storyLikeUserIds = story.likes.map((u) => u._id.toString());

  if (!storyLikeUserIds.includes(activeUser._id)) {
    story.likes.push(activeUser._id);
  } else {
    // remove existing like
    story.likes = story.likes.filter(
      (idObj) => idObj.toString() !== activeUser._id
    );
  }
  story.likeCount = story.likes.length;
  await story.save();

  return res.status(200).json({
    success: true,
    data: story,
  });
});

// @desc    Get story data for editing (populated)
// @route   GET /story/editStory/:slug
// @access  Private (only owner)
const editStoryPage = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;
  const story = await Story.findOne({ slug }).populate("author likes");
  if (!story) {
    return res.status(404).json({ success: false, error: "Story not found." });
  }
  return res.status(200).json({
    success: true,
    data: story,
  });
});

// @desc    Edit story (fields + optional new images)
// @route   PUT /story/:slug/edit
// @access  Private (only owner)
const editStory = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;
  const { title, content, price, category, existingImageUrls } = req.body;
  // existingImageUrls: array of strings representing the old URLs user wants to keep

  const story = await Story.findOne({ slug });
  if (!story) {
    return res.status(404).json({ success: false, error: "Story not found." });
  }

  // Update basic fields:
  story.title = title;
  story.content = content;
  story.price = price;
  story.category = category;

  // Determine new imageUrl array:
  // 1) Start from any `existingImageUrls` the client wants to keep (must be ≤ 5)
  // 2) If they uploaded new files, append up to (5 - existingImageUrls.length) new URLs
  let updatedImageUrls = Array.isArray(existingImageUrls)
    ? existingImageUrls.filter((url) => typeof url === "string")
    : [];

  // If client sent new files (req.files), upload them and append
  if (req.files && req.files.length > 0) {
    // Ensure total won't exceed 5:
    if (updatedImageUrls.length + req.files.length > 5) {
      return res
        .status(400)
        .json({ error: "A story can have up to 5 images only." });
    }

    const uploadPromises = req.files.map((file) =>
      handleUpload(file.buffer, file.mimetype)
    );
    const newUploadedUrls = await Promise.all(uploadPromises);
    updatedImageUrls = updatedImageUrls.concat(newUploadedUrls);
  }

  // Delete any removed images from Cloudinary if needed:
  const oldUrlsSet = new Set(story.imageUrls);
  const keptUrlsSet = new Set(updatedImageUrls);
  for (const oldUrl of story.imageUrls) {
    if (!keptUrlsSet.has(oldUrl)) {
      // User removed this URL, so delete it from our storage (if your deleteImageFile helper knows how to delete by URL)
      await deleteImageFile(req, oldUrl);
    }
  }

  story.imageUrls = updatedImageUrls;
  await story.save();

  return res.status(200).json({
    success: true,
    data: story,
  });
});

// @desc    Delete a story (and all its images & comments)
// @route   DELETE /story/:slug/delete
// @access  Private (only owner)
const deleteStory = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;

  const story = await Story.findOne({ slug });
  if (!story) {
    return res.status(404).json({ success: false, error: "Story not found." });
  }

  // Delete all images from Cloudinary:
  for (const imageUrl of story.imageUrls) {
    await deleteImageFile(req, imageUrl);
  }

  await story.remove();
  return res.status(200).json({
    success: true,
    message: "Story deleted successfully.",
  });
});

module.exports = {
  addStory,
  getAllStories,
  detailStory,
  likeStory,
  editStoryPage,
  editStory,
  deleteStory,
};
