const pool = require('../db/dbConfig');


const getAssignmentsByCourseId = async (courseId) => {
  const result = await pool.query('SELECT * FROM assignments WHERE course_id = $1', [courseId]);
  return result.rows;
};

// Create a new assignment
const createAssignment = async (assignment) => {
  const { course_id, title, due_date, status } = assignment;
  const result = await pool.query(
    'INSERT INTO assignments (course_id, title, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [course_id, title, due_date, status || 'pending']
  );
  return result.rows[0];
};

// Update an existing assignment
const updateAssignment = async (assignmentId, updatedAssignment) => {
  const { title, due_date, status } = updatedAssignment;
  const result = await pool.query(
    'UPDATE assignments SET title = $1, due_date = $2, status = $3 WHERE id = $4 RETURNING *',
    [title, due_date, status, assignmentId]
  );
  return result.rows[0];
};

// Delete an assignment by ID
const deleteAssignment = async (assignmentId) => {
  const result = await pool.query(
    'DELETE FROM assignments WHERE id = $1 RETURNING *',
    [assignmentId]
  );
  return result.rows[0];
};

module.exports = {
  getAssignmentsByCourseId,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
