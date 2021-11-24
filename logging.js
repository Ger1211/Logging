const picklify = require("picklify");
const fs = require("fs");
const util = require("util");
const loggly = require("./LogglyAPIClient");
class Logging {
  constructor() {
    this.enable = true;
  }

  turnOnOff(){
    let status;
    if(this.enable){
      this.enable = false
      status = "Off"
    }else{
      this.enable = true;
      status = "On"
    }
    this.save("data.json")
    return status;
  }

  addArtistCreationLog(data) {
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      let promise = appendFile("logs.txt", `[INFO] - Artist ${data.name} was created.\n`);
      loggly.log('info', `Artist ${data.name} was created.`);
      return promise;
    } else {
      return Promise.resolve();
    }
  }

  addAlbumCreationLog(data) {
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      let promise = appendFile("logs.txt", `[INFO] - Album ${data.albumName} was created.\n`);
      loggly.log('info', `Album ${data.albumName} was created.`);
      return promise;
    } else {
      return Promise.resolve();
    }
  }

  addTrackCreationLog(data) {
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      let promise =  appendFile("logs.txt", `[INFO] - Track ${data.name} was created.\n`);
      loggly.log('info', `Track ${data.name} was created.`);
      return promise;
    } else {
      return Promise.resolve();
    }
  }


  deleteArtistCreationLog(data){
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      let promise = appendFile("logs.txt", `[INFO] - Artist ${data.name} was eliminated.\n`);
      loggly.log('info', `Artist ${data.name} was eliminated.`);
      return promise;
    } else {
      return Promise.resolve();
    }
  }

  deleteAlbumCreationLog(data){
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      let promise = appendFile("logs.txt", `[INFO] - Album ${data.name} was eliminated.\n`);
      loggly.log('info', `Album ${data.name} was eliminated.`);
      return promise;
    } else {
      return Promise.resolve();
    }
  }

  deleteTrackCreationLog(data){
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      let promise = appendFile("logs.txt", `[INFO] - Track ${data.name} was eliminated.\n`);
      loggly.log('info', `Track ${data.name} was eliminated.`);
      return promise;
    } else {
      return Promise.resolve();
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
