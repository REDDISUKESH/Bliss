import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3500/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <div>
              <h3>{course.course_name}</h3>
              <p>Professor: {course.professor || 'N/A'}</p>
              <p>Duration: {course.start_date} to {course.end_date}</p>
              <Link to={`/assignments/${course.id}`}>View Assignments</Link>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => alert("Navigate to 'Add Course' form")}>Add Course</button>
    </div>
  );
}

export default CourseList;
