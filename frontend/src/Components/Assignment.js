import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AssignmentList = () => {
  const { courseId } = useParams(); // Retrieve the course ID from the URL
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch assignments related to the specified course ID
    axios.get(`http://localhost:3500/assignments?course_id=${courseId}`)
      .then(response => setAssignments(response.data))
      .catch(error => console.error('Error fetching assignments:', error));
  }, [courseId]);

  // Function to mark an assignment as completed
  const markAsCompleted = (id) => {
    axios.put(`http://localhost:3500/assignments/${id}`, { status: 'completed' })
      .then(() => {
        // Update the assignment's status locally after successful API call
        setAssignments(assignments.map(assignment => 
          assignment.id === id ? { ...assignment, status: 'completed' } : assignment
        ));
      })
      .catch(error => console.error('Error updating assignment status:', error));
  };

  return (
    <div>
      <h1>Assignments</h1>
      <ul>
        {assignments.map(assignment => (
          <li key={assignment.id}>
            <div>
              <h3>{assignment.title}</h3>
              <p>Due Date: {assignment.due_date}</p>
              <p>Status: {assignment.status}</p>
              {assignment.status !== 'completed' && (
                <button onClick={() => markAsCompleted(assignment.id)}>
                  Mark as Completed
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => alert("Navigate to 'Add Assignment' form")}>Add Assignment</button>
    </div>
  );
}

export default AssignmentList;
