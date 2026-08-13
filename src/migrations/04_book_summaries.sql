-- 04_book_summaries.sql

-- Create book summaries table
CREATE TABLE IF NOT EXISTS book_summaries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (book_id) REFERENCES books(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);