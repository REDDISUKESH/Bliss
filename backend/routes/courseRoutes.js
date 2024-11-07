
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

module.exports = router;
