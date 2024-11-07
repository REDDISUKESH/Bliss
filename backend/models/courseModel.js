const pool = require('../db/dbConfig');

// Get all courses
const getAllCourses = async () => {
  const result = await pool.query('SELECT * FROM courses');
  return result.rows;
};

// Create a new course
const createCourse = async (course) => {
  const { course_name, professor, start_date, end_date } = course;
  const result = await pool.query(
    'INSERT INTO courses (course_name, professor, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
    [course_name, professor, start_date, end_date]
  );
  return result.rows[0];
};

// Update an existing course
const updateCourse = async (courseId, updatedCourse) => {
  const { course_name, professor, start_date, end_date } = updatedCourse;
  const result = await pool.query(
    'UPDATE courses SET course_name = $1, professor = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *',
    [course_name, professor, start_date, end_date, courseId]
  );
  return result.rows[0];
};

// Delete a course by ID
const deleteCourse = async (courseId) => {
  const result = await pool.query(
    'DELETE FROM courses WHERE id = $1 RETURNING *',
    [courseId]
  );
  return result.rows[0];
};

// Export functions for use in routes
module.exports = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
