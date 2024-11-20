// const clickSchema = new mongoose.Schema({
//     shortUrl: {
//       type: String,
//       required: true, // Reference to the short URL
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now, // Time of the click
//     },
//     userIp: {
//       type: String, // IP address of the user
//     },
//     referrer: {
//       type: String, // Referrer information (if available)
//     },
//   });
  
//   const Click = mongoose.model("Click", clickSchema);
  
//   module.exports = Click;

const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userIp: { type: String },
  referrer: { type: String, default: "direct" },
});

module.exports = mongoose.model("Click", clickSchema);

  