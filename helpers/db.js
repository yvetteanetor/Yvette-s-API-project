const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../db.json");

// Read entire database
function readDB() {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

// Write entire database
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
