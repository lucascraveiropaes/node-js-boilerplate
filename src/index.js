import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use( cors() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.get("/", (req, res) => {
  res.send("Hello World!")
});

app.listen(process.env.PORT, () => {
  console.log("Listening: http://localhost:" + process.env.PORT)
});
