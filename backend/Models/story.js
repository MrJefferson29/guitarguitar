const mongoose = require("mongoose");
const Comment = require("./comment");
const slugify = require("slugify");

const StorySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    slug: String,
    title: {
      type: String,
      required: [true, "What is the puppy weight"],
    },
    content: {
      type: String,
      required: [true, "Provide the product details"],
    },
    price: {
      type: String,
      required: [true, "Please a provide the price "],
    },
    category: {
      type: String,
      required: [true, "Please provide a category for the story"],
    },
    imageUrls: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 8,
        message: "A story can have up to 8 images only.",
      },
    },
    readtime: {
      type: Number,
      default: 3,
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

StorySchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
  }

  this.slug = this.makeSlug();

  next();
});

StorySchema.pre("remove", async function (next) {
  const story = await Story.findById(this._id);

  await Comment.deleteMany({
    story: story,
  });
});

StorySchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: "-",
    remove: /[*+~.()'"!:@/?]/g,
    lower: true,
    strict: false,
    locale: "tr",
    trim: true,
  });
};

const Story = mongoose.models.Story || mongoose.model("Story", StorySchema);

module.exports = Story;
