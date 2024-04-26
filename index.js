const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Canvas Isle is Running");
});

app.listen(port, () => {
  console.log(`server running on port :${port}`);
});
