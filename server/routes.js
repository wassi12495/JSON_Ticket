let express = require("express")
let bodyParser = require("body-parser")
let Ajv = require("ajv")
let router = express.Router()

let formSchema = require("./FormSchema.json")

router.use(bodyParser.json())

let data = formSchema

router.get("/", (req, res) => {
  res.send(data)
})

router.get("/schema", (req, res) => {
  res.send(formSchema)
})

module.exports = {
  router,
}
