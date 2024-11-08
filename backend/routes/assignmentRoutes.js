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

// Update an existing assignment by ID
router.put('/:id', async (req, res) => {
  const assignmentId = req.params.id; // Get assignment ID from the URL
  try {
    const updatedAssignment = await assignmentModel.updateAssignment(assignmentId, req.body);
    if (updatedAssignment) {
      res.json(updatedAssignment);
    } else {
      res.status(404).json({ error: 'Assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating assignment' });
  }
});

// Delete an assignment by ID
router.delete('/:id', async (req, res) => {
  const assignmentId = req.params.id; // Get assignment ID from the URL
  try {
    const deletedAssignment = await assignmentModel.deleteAssignment(assignmentId);
    if (deletedAssignment) {
      res.json(deletedAssignment);
    } else {
      res.status(404).json({ error: 'Assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting assignment' });
  }
});

module.exports = router;
