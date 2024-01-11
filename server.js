const exp = require("constants");
const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const errorHandler = require("./middleware/errorHandling");
const corsOptions = require("./configs/corsOptions")
const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);
// app.use("/", express.static(path.join(__dirname, "/public")));
app.use(express.static("public")); //this is a middleware
app.use(express.json()); //process json
app.use(cookieParser());
app.use(cors(corsOptions))

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found"); //content type response header
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log("running server"));
