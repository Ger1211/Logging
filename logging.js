const picklify = require("picklify");
const fs = require("fs");
const util = require("util");
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
      return appendFile("logs.txt", `[INFO] - Artist ${data.name} was created.\n`);
    }
  }

  addAlbumCreationLog(data) {
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      return appendFile("logs.txt", `[INFO] - Album ${data.albumName} was created.\n`);
    }
  }

  addTrackCreationLog(data) {
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      return appendFile("logs.txt", `[INFO] - Track ${data.name} was created.\n`);
    }
  }


  deleteArtistCreationLog(data){
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      return appendFile("logs.txt", `[INFO] - Artist ${data.name} was eliminated.\n`);
    }
  }

  deleteAlbumCreationLog(data){
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      return appendFile("logs.txt", `[INFO] - Album ${data.name} was eliminated.\n`);
    }
  }

  deleteTrackCreationLog(data){
    if (this.enable) {
      const appendFile = util.promisify(fs.appendFile);
      return appendFile("logs.txt", `[INFO] - Track ${data.name} was eliminated.\n`);
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
