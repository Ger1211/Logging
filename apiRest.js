let express = require("express");
const fs = require("fs");
const loggingMod = require("./logging");
const { InvalidBodyError } = require("./errors/exceptions");

function getLogging(filename = "data.json") {
  let logging = new loggingMod.Logging();
  if (fs.existsSync(filename)) {
    logging = loggingMod.Logging.load(filename);
  }
  return logging;
}

let app = express();
let router = express.Router();
let port = process.env.PORT || 3002;
app.use(express.json());

router.post("/artists/creation", (req, res) => {
  getLogging().addArtistCreationLog(req.body)
    .then(() => res.status(201).send())
    .catch((error) => res.status(error.statusCode).send(error.error)); 
})

function errorHandler(err, req, res, next) {
  if (err instanceof SyntaxError || err instanceof InvalidBodyError) {
    return res.status(400).send({ status: 400, errorCode: "BAD_REQUEST" });
  } else {
    next(err);
  }
}

app.use("/api", router);
app.use(errorHandler);
app.listen(port, () => console.log(`Port ${port} listening`));
