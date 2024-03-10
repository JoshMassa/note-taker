const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid')

// API GET Route for retrieving all notes
router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = router;