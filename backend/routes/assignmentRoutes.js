
const express = require('express');
const router = express.Router();
const assignmentModel = require('../models/assignmentModel');

// Get assignments for a specific course
router.get('/:courseId', async (req, res) => {
  try {
    const assignments = await assignmentModel.getAssignmentsByCourseId(req.params.courseId);
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching assignments' });
  }
});

// Create a new assignment
router.post('/', async (req, res) => {
  try {
    const newAssignment = await assignmentModel.createAssignment(req.body);
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ error: 'Error creating assignment' });
  }
});

module.exports = router;
