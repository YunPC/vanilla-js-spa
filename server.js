const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "static")));

app.use(
  "/node_modules",
  express.static(path.resolve(__dirname, "node_modules"))
);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(3000, () => console.log("Server running..."));
