import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Assignment.css'; 

const AssignmentList = () => {
  const { courseId } = useParams(); 
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch assignments related to the specified course ID
    axios.get(`http://localhost:3500/assignments?course_id=${courseId}`)
      .then(response => setAssignments(response.data))
      .catch(error => {
        console.error('Error fetching assignments:', error);

        // Use hardcoded data if the API call fails
        setAssignments([
          {
            id: 1,
            title: 'Assignment 1',
            due_date: '2024-01-15',
            status: 'pending'
          },
          {
            id: 2,
            title: 'Assignment 2',
            due_date: '2024-02-20',
            status: 'completed'
          },
          {
            id: 3,
            title: 'Assignment 3',
            due_date: '2024-03-10',
            status: 'pending'
          }
        ]);
      });
  }, [courseId]);

  // Function to mark an assignment as completed
  const markAsCompleted = (id) => {
    axios.put(`http://localhost:3500/assignments/${id}`, { status: 'completed' })
      .then(() => {
        
        setAssignments(assignments.map(assignment => 
          assignment.id === id ? { ...assignment, status: 'completed' } : assignment
        ));
      })
      .catch(error => console.error('Error updating assignment status:', error));
  };

  return (
    <div className="assignment-list">
      <h1 className="title">Assignments</h1>
      <ul className="assignment-list-items">
        {assignments.map(assignment => (
          <li key={assignment.id} className="assignment-item">
            <div className={`assignment-card ${assignment.status === 'completed' ? 'completed' : ''}`}>
              <h3 className="assignment-title">{assignment.title}</h3>
              <p className="assignment-due-date">Due Date: {assignment.due_date}</p>
              <p className="assignment-status">Status: {assignment.status}</p>
              {assignment.status !== 'completed' && (
                <button className="complete-btn" onClick={() => markAsCompleted(assignment.id)}>
                  Mark as Completed
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className="add-assignment-btn" onClick={() => alert("Navigate to 'Add Assignment' form")}>Add Assignment</button>
    </div>
  );
}

export default AssignmentList;
