const express = require("express");
const fs = require("fs");
const app = express();

app.get("/video", (req, res) => {
  const path = "./videos/SampleVideo_1280x720_1mb.mp4";
  fs.stat(path, (err, stats) => {
    if (err) {
      console.error("An error occurred ");
      res.sendStatus(500);
      return;
    }

    res.writeHead(200, {
      "Content-Length": stats.size,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(path).pipe(res);
  });
});

//
// Starts the HTTP server.
//
app.listen(3000, () => {
  console.log(
    `Microservice listening on port ${3000}, point your browser at http://localhost:3000/video`
  );
});
