const Click = require("../models/click");
const URL = require("../models/url");

// Total Clicks for a Short URL
exports.getTotalClicks = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const totalClicks = await Click.countDocuments({ shortUrl });
    res.json({ shortUrl, totalClicks });
  } catch (error) {
    console.error("Error fetching total clicks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Clicks Grouped by Referrer
exports.getClicksByReferrer = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const referrerStats = await Click.aggregate([
      { $match: { shortUrl } },
      { $group: { _id: "$referrer", count: { $sum: 1 } } },
    ]);
    res.json({ shortUrl, referrerStats });
  } catch (error) {
    console.error("Error fetching referrer stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Top Most Clicked URLs
exports.getTopClickedUrls = async (req, res) => {
  try {
    const topUrls = await URL.find().sort({ clicks: -1 }).limit(5);
    res.json(topUrls);
  } catch (error) {
    console.error("Error fetching top clicked URLs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
