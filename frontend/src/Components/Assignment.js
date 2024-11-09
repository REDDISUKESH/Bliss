import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Assignment.css';

const AssignmentList = () => {
  const { courseId } = useParams(); // Retrieve the course ID from the URL
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Fetch assignments related to the specified course ID
    axios.get(`http://localhost:3500/assignments?course_id=${courseId}`)
      .then(response => {
        const assignments = response.data;
        setAssignments(assignments);
        setFilteredAssignments(assignments); 
        scheduleNotifications(assignments); 
      })
      .catch(error => {
        console.error('Error fetching assignments:', error);
        
        // Use hardcoded data if the API call fails
        const hardcodedAssignments = [
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
        ];
        setAssignments(hardcodedAssignments);
        setFilteredAssignments(hardcodedAssignments);
        scheduleNotifications(hardcodedAssignments);
      });
  }, [courseId]);

  // Function to mark an assignment as completed
  const markAsCompleted = (id) => {
    axios.put(`http://localhost:3500/assignments/${id}`, { status: 'completed' })
      .then(() => {
        // Update the assignment's status locally after successful API call
        const updatedAssignments = assignments.map(assignment =>
          assignment.id === id ? { ...assignment, status: 'completed' } : assignment
        );
        setAssignments(updatedAssignments);
        applyFilters(updatedAssignments); // Re-apply filters
      })
      .catch(error => console.error('Error updating assignment status:', error));
  };

  // Function to filter assignments by status
  const filterAssignments = (status) => {
    setFilterStatus(status);
    applyFilters(assignments, status);
  };

  const applyFilters = (assignmentList, status = filterStatus) => {
    let filtered = assignmentList;
    if (status === 'pending') {
      filtered = assignmentList.filter(assignment => assignment.status === 'pending');
    } else if (status === 'completed') {
      filtered = assignmentList.filter(assignment => assignment.status === 'completed');
    }
    setFilteredAssignments(filtered);
  };

  // Updated sort function for assignments by due date
  const sortAssignmentsByDueDate = () => {
    // Sort the main assignments array to ensure sorted data is stored
    const sortedAssignments = [...assignments].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    setAssignments(sortedAssignments);
    //applyFilters(sortedAssignments); 
  };

  // Function to schedule notifications for assignments due within 24 hours
  const scheduleNotifications = (assignments) => {
    assignments.forEach(assignment => {
      const dueDate = new Date(assignment.due_date);
      const timeDifference = dueDate - new Date();

      
      if (timeDifference > 0 && timeDifference <= 24 * 60 * 60 * 1000 && assignment.status === 'pending') {
        alert(`Reminder: "${assignment.title}" is due within 24 hours!`);
      }
    });
  };

  return (
    <div className="assignment-list">
      <h1 className="title">Assignments</h1>

      
      <div className="controls">
        <button onClick={() => filterAssignments('all')} className={filterStatus === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => filterAssignments('pending')} className={filterStatus === 'pending' ? 'active' : ''}>Pending</button>
        <button onClick={() => filterAssignments('completed')} className={filterStatus === 'completed' ? 'active' : ''}>Completed</button>
        <button onClick={()=>sortAssignmentsByDueDate}>Sort by Due Date</button>
      </div>

     
      <ul className="assignment-list-items">
        {filteredAssignments.map(assignment => (
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
