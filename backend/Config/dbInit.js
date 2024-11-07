
const pool = require('./dbConfig');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        course_name TEXT NOT NULL,
        professor TEXT,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS assignments (
        id SERIAL PRIMARY KEY,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
        title TEXT NOT NULL,
        due_date DATE NOT NULL,
        status TEXT CHECK (status IN ('pending', 'completed')) DEFAULT 'pending'
      );
    `);

    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    pool.end(); 
  }
};

createTables();
