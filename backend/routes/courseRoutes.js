const express = require('express');
const router = express.Router();
const courseModel = require('../models/courseModel');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await courseModel.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

// Create a new course
router.post('/', async (req, res) => {
  try {
    const newCourse = await courseModel.createCourse(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error creating course' });
  }
});

// Update an existing course by ID
router.put('/:id', async (req, res) => {
  const courseId = req.params.id;  // Get course ID from the URL
  try {
    const updatedCourse = await courseModel.updateCourse(courseId, req.body);
    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating course' });
  }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
  const courseId = req.params.id;  // Get course ID from the URL
  try {
    const deletedCourse = await courseModel.deleteCourse(courseId);
    if (deletedCourse) {
      res.json(deletedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting course' });
  }
});

module.exports = router;
