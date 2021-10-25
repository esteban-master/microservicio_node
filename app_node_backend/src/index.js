const express = require("express");

const mongoose = require("mongoose");
const app = express();

if (!process.env.PORT) {
  throw new Error("Especificar un numero de puerto");
}

const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;
mongoose
  .connect(`${DBHOST}/${DBNAME}`)
  .then((db) => console.log("DB is conected", db.connection.host))
  .catch((err) => console.error(err));
//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;
const postSchema = new mongoose.Schema({
  title: String,
});

const postModel = mongoose.model("Post", postSchema);
app.get("/posts", async (req, res) => {
  const posts = await postModel.find({});
  return res.json(posts);
});
app.listen(PORT, () => {
  console.log(
    `Microservice listening on port ${PORT}, point your browser at http://localhost:${PORT}/video`
  );
});
