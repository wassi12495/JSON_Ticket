let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();

router.use(bodyParser.json());

let data = {};

router.get('/', (req, res) => {
  res.send(data);
});
module.exports = {
  router
};
