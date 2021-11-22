const picklify = require("picklify");
const fs = require("fs");
const util = require("util");
class Logging {
  constructor() {
    this.enable = true;
  }

  addArtistCreationLog(data) {
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      return appendFile("logs.txt", `[INFO] - Artist ${data.name} was created.\n`);
    }
  }
  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, { encoding: "utf-8" });
    const classes = [Logging];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

module.exports = {
  Logging: Logging,
};
