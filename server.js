const express = require("express");
const app = express();

app.use(express.json());


app.use("/products", require("./routes/products"));


app.get("/", (req, res) => {
  res.json({ message: "Yvette API is running 🖤" });
});


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
