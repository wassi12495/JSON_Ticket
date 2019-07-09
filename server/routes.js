let express = require('express');
let bodyParser = require('body-parser');
let Ajv = require('ajv');
let router = express.Router();

let formSchema = require('./FormSchema.json');

router.use(bodyParser.json());

let data = formSchema;

router.get('/', (req, res) => {
  res.send(data);
});

router.get('/schema', (req, res) => {
  res.send(formSchema);
});

router.post('/ticket', (req, res) => {
  console.log(req.body);
  let body = req.body;
  res.send(body);
});
module.exports = {
  router,
};
