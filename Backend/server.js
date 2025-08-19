require("dotenv").config();
const path = require("path");
const express = require("express");
const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

// ✅ Pehle API routes define karo
// app.use("/songs", require("./src/routes/songRoutes"));

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
