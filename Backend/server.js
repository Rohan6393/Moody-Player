require("dotenv").config();
const path = require("path");
const express = require("express");
const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");

connectDB();

// ✅ Frontend serve sirf production me
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
