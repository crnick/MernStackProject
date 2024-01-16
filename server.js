require("dotenv").config() //use environment variables in all files
const path = require("path");
const { logger } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const errorHandler = require("./middleware/errorHandling");
const corsOptions = require("./configs/corsOptions")
const app = express();
const PORT = process.env.PORT || 3500;
const connectDB = require("./configs/dbConn")
const mongoose = require("mongoose")
const {logEvents} = require("./middleware/logger")

app.use(logger);  //custom middleware for logging  
// app.use("/", express.static(path.join(__dirname, "/public")));
app.use(express.static("public")); //this is a middleware
app.use(express.json()); //process json data
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

app.use(errorHandler); //custom middleware for handling errors

mongoose.connection.once('open',()=>{
  app.listen(PORT, () => console.log("running server"));
})

mongoose.connection.on('error',()=>{
  console.log("Error")
})
