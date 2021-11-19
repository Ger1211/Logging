const picklify = require("picklify");
const fs = require("fs");
const Log = require("./domain/log");

class Logging {
  constructor() {
    this.logs = [];
  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, { encoding: "utf-8" });
    const classes = [Logging, Log];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

module.exports = {
  Logging: Logging,
};
