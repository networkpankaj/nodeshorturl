const express = require("express");
const {
  getTotalClicks,
  getClicksByReferrer,
  getTopClickedUrls,
} = require("../controllers/clickController");

const router = express.Router();

router.get("/clicks/:shortUrl", getTotalClicks);
router.get("/referrers/:shortUrl", getClicksByReferrer);
router.get("/top", getTopClickedUrls);

module.exports = router;
