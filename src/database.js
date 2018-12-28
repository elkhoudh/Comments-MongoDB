let mongoose = require("mongoose");
const server = "root:elkhoudiri123@ds245234.mlab.com:45234";
const database = "instagram2";
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(
        `mongodb://${server}/${database}`,
        { useNewUrlParser: true }
      )
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
      });
  }
}
module.exports = new Database();
