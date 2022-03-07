const app = require("./configs/index");
require('./configs/connect');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

dotenv.config();
let port = process.env.PORT;

app.listen(port, () => {
  console.log("APP STARTED ON ", port);
});
