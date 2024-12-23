const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    const {task_name, description, deadline, category} = req.body;
    console.log(req.body);
    res.status(200).json({ message: `Task ${task_name} created`});
});

router.get("/:task_id", (req, res) => {
    const {task_id} = req.params;
    res.status(200).json({ message: `Task id equals ${task_id}`})
});

router.put("/:task_id", (req, res) => {
    const {task_id} = req.params;
    const {task_name, description, deadline, category} = req.body;
    res.status(200).json({ message: `Updated task id for ${task_name} equals ${task_id}`})
});

router.delete("/:task_id", (req, res) => {
    const {task_id} = req.params;
    res.status(200).json({ message: `Task with id ${task_id} deleted`})
});
module.exports = router;