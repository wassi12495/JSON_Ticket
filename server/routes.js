let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
router.use(bodyParser.json());

let dataSample = {
  symbol: 'goog',
  bps: 2,
  targetBps: 3,
  quantity: 1000,
  notional: 1,
  orderType: 'LMT',
  price: 200,
  strategy1: 'sub A',
  strategy2: 'sub C',
};

// validation schema
let Ajv = require('ajv');
let ajv = new Ajv();
let formSchema = require('./FormSchema.json');
let validate = ajv.compile(formSchema);

let schema = formSchema;

router.get('/schema', (req, res) => {
  res.send(schema);
});

// Test schema reciever - just returns the schema with the default functional dataset
router.get('/schema/test', (req, res) => {
  let valid = validate(dataSample);
  console.log(valid);
  if (!valid) console.log(validate);
  res.send(formSchema);
});

// New Ticket is submitted
router.post('/ticket/new', (req, res) => {
  // console.log(req.body);
  let body = req.body;
  // console.log(validate);
  let valid = validate(body);
  console.log(valid);
  if (!valid) {
    console.log(validate);
    res.send(validate.errors);
  } else {
    res.send(body);
  }
});
module.exports = {
  router,
};
