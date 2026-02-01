-- Create database if not exists
CREATE DATABASE IF NOT EXISTS todo_dev;
USE todo_dev;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Demo queries

-- Find all tasks
SELECT * FROM tasks ORDER BY created_at DESC;

-- Find one task
SELECT * FROM tasks WHERE id = 1;

-- Insert a new task
INSERT INTO tasks (title, completed) VALUES ('Sample Task', FALSE);

-- Update a task
UPDATE tasks SET title = 'Updated Title', completed = TRUE WHERE id = 1;

-- Delete a task
DELETE FROM tasks WHERE id = 1;
