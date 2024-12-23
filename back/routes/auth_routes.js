const express = require('express');
const router = express.Router();

router.post('/sign_in', (req, res) => {
    const {username, password} = req.body;
    console.log(req.body);
    res.status(200).json({ message: `Welcome, ${username}`});
});

router.post('/sign_up', (req, res) => {
    const {username, email, password} = req.body;
    console.log(req.body);
    res.status(200).json({ message: `Welcome, ${username}`});
});

module.exports = router;