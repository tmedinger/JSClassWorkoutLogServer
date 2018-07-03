const router = require("express").Router();
const sequelize = require("../db");
const Log = sequelize.import("../models/log");

router.post("/create", (req, res) => {
    let owner = req.user.id;
    let logDescription = req.body.log.description;
    let logDefinition = req.body.log.definition;
    let logResult = req.body.log.result;
    
    Log.create({
        description: logDescription,
        definition: logDefinition,
        result: logResult,
        owner: owner
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err.errors[0]
    .message}))
    
})

router.get("/getall", (req, res) => {
    let userid = req.user.id;

    Log.findAll(
        {where: { owner: userid }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err.errors[0]
    .message}))
})

router.get("/get/:id", (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    Log.findOne({
        where: { id: data, owner: userid }
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err.errors[0]
    .message}))
})

router.put("/update/:id", (req, res) => {
    let data = req.params.id;
    let logDescription = req.body.log.description;
    let logDefinition = req.body.log.definition;
    let logResult = req.body.log.result;
    
    Log.update({
        description: logDescription,
        definition: logDefinition,
        result: logResult
    },
    {where: {id: data}
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({error: err.errors[0]
    .message}))
})

router.delete("/delete/:id", (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    Log.destroy({
        where: { id: data, owner: userid }
    })
    .then(data => res.send("Log deleted."))
    .catch(err => res.status(500).json({error: err.errors[0]
    .message}))
})

module.exports = router;