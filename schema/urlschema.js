// const mongoose = require("mongoose");

// const urlSchema = new mongoose.Schema({
//   shortUrl: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   longUrl: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   expiration: {
//     type: Date, // Optional expiration time for the URL
//     default: null,
//   },
//   clicks: {
//     type: Number,
//     default: 0, // Number of times the short URL has been accessed
//   },
// });

// const URL = mongoose.model("URL", urlSchema);

// module.exports = URL;


const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortUrl: { type: String, unique: true, required: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiration: { type: Date, default: null },
  clicks: { type: Number, default: 0 },
});

module.exports = mongoose.model("URL", urlSchema);
