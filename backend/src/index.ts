import express from "express";

const app = express();
const port = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
