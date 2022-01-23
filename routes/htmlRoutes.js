// import express (and path?)
const path = require('path');
const router = require('express').Router();

// create route to get notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// create route to get index.html file
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;