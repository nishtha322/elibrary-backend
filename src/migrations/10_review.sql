CREATE TABLE IF NOT EXISTS book_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    rating TINYINT NOT NULL,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unique_user_book_review (user_id, book_id),

    CONSTRAINT fk_review_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_review_book
        FOREIGN KEY (book_id) REFERENCES books(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_review_rating
        CHECK (rating BETWEEN 1 AND 5)
);