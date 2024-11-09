import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CourseList.css'; 

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5342/courses')
      .then(response => setCourses(response.data))
      .catch(error => {
        console.error('Error fetching courses:', error);
        
        // If the API fails, use hardcoded data
        setCourses([
          {
            id: 1,
            course_name: 'Introduction to Psychology',
            professor: 'Dr. Smith',
            start_date: '2024-01-10',
            end_date: '2024-05-15',
          },
          {
            id: 2,
            course_name: 'Advanced Calculus',
            professor: 'Prof. Jones',
            start_date: '2024-02-01',
            end_date: '2024-06-01',
          },
          {
            id: 3,
            course_name: 'History of Art',
            professor: 'Ms. Brown',
            start_date: '2024-03-01',
            end_date: '2024-07-01',
          }
        ]);
      });
  }, []);

  return (
    <div className="course-list">
      <h1 className="title">Courses</h1>
      <ul className="course-list-items">
        {courses.map(course => (
          <li key={course.id} className="course-item">
            <div className="course-card">
              <h3 className="course-name">{course.course_name}</h3>
              <p className="course-professor">Professor: {course.professor || 'N/A'}</p>
              <p className="course-duration">Duration: {course.start_date} to {course.end_date}</p>
              <Link to={`/assignments/${course.id}`} className="view-assignments-link">View Assignments</Link>
            </div>
          </li>
        ))}
      </ul>
      <button className="add-course-btn" onClick={() => alert("Navigate to 'Add Course' form")}>Add Course</button>
    </div>
  );
}

export default CourseList;
