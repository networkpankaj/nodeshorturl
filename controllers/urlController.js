const URL = require("../schema/urlschema");
const Click = require("../schema/clickschema");
const shortid = require("shortid");

// Shorten URL
exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  try {
    let existingUrl = await URL.findOne({ longUrl });
    if (existingUrl) {
      return res.json({ shortUrl: `http://localhost:3000/${existingUrl.shortUrl}` });
    }

    const shortUrl = shortid.generate();
    const newUrl = new URL({ longUrl, shortUrl });
    await newUrl.save();

    res.json({ shortUrl: `http://localhost:3000/${shortUrl}` });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Redirect and Log Click
exports.redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlRecord = await URL.findOne({ shortUrl });
    if (!urlRecord) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    urlRecord.clicks += 1;
    await urlRecord.save();

    const click = new Click({
      shortUrl,
      userIp: req.ip,
      referrer: req.headers.referer || "direct",
    });
    await click.save();

    res.redirect(urlRecord.longUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
