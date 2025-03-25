
CREATE TABLE doctors (
    doctor_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    speciality VARCHAR(100) NOT NULL,
    degree VARCHAR(50) NOT NULL,
    experience INT CHECK (experience >= 0) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location TEXT DEFAULT 'MedicareHeart Institute, Okhla Road' NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female')) NOT NULL
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT DEFAULT NULL
);
CREATE TABLE review (
    rating_id SERIAL PRIMARY KEY,
    rating INT DEFAULT 1 CHECK (rating >= 1 AND rating <= 5),
    comment TEXT DEFAULT NULL,
    doctor_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors (doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO users (username, email)
VALUES
('fake_user1', 'fake1@gmail.com'),
('fake_user2', 'fake2@gmail.com');
INSERT INTO doctors (name, speciality, degree, experience, email, gender)
VALUES
('Dr. Olivia Jackson', 'Oncologist', 'DM', 11, 'dr.jackson@email.com', 'Female'),
('Dr. Ethan Brown', 'Cardiologist', 'MD', 15, 'dr.brown@email.com', 'Male'),
('Dr. Ava Smith', 'Dermatologist', 'MBBS', 9, 'dr.smith@email.com', 'Female'),
('Dr. Liam Johnson', 'Neurologist', 'DM', 13, 'dr.johnson@email.com', 'Male'),
('Dr. Sophia Davis', 'Pediatrician', 'MD', 7, 'dr.davis@email.com', 'Female'),
('Dr. Noah Wilson', 'Orthopedic', 'MS', 10, 'dr.wilson@email.com', 'Male'),
('Dr. Mia Clark', 'Gynecologist', 'MBBS', 12, 'dr.clark@email.com', 'Female'),
('Dr. Jacob Martinez', 'ENT Specialist', 'MD', 8, 'dr.martinez@email.com', 'Male'),
('Dr. Emma Watson', 'Psychiatrist', 'DM', 14, 'dr.watson@email.com', 'Female'),
('Dr. Lucas Anderson', 'General Physician', 'MBBS', 5, 'dr.anderson@email.com', 'Male'),
('Dr. Amelia White', 'Endocrinologist', 'MD', 6, 'dr.white@email.com', 'Female'),
('Dr. Henry Moore', 'Urologist', 'MS', 9, 'dr.moore@email.com', 'Male'),
('Dr. Isabella Taylor', 'Dentist', 'BDS', 4, 'dr.taylor@email.com', 'Female');
INSERT INTO review (rating, comment, doctor_id, user_id)
VALUES
(5, 'Excellent care and professionalism.', 1, 1),
(4, 'Good experience, but a bit of waiting time.', 2, 1),
(5, 'Very knowledgeable and kind.', 3, 2),
(3, 'Service was okay, but could be better.', 4, 1),
(5, 'Dr. Sophia is amazing with kids!', 5, 2),
(4, 'Friendly and explained everything well.', 6, 1),
(2, 'Felt rushed during the consultation.', 7, 2),
(5, 'Helped me recover quickly. Highly recommend!', 8, 1),
(3, 'Average service but helpful advice.', 9, 2),
(4, 'Took time to explain and very understanding.', 10, 1),
(5, 'Best doctor I’ve visited in a while.', 11, 2),
(1, 'Wait time was too long.', 12, 1),
(5, 'Great knowledge and expertise.', 13, 2);


select * from review


-- Additional reviews by user_id 2
INSERT INTO review (rating, comment, doctor_id, user_id)
VALUES
(5, NULL, 8, 2),
(4, NULL, 9, 2),
(2, NULL, 10, 2),
(3, NULL, 11, 2),
(4, NULL, 12, 2),
(5, NULL, 13, 2),
(1, NULL, 1, 2),
(4, NULL, 1, 1),
(3, NULL, 2, 1),
(5, NULL, 3, 1),
(2, NULL, 4, 1),
(4, NULL, 5, 1),
(5, NULL, 6, 1),
(3, NULL, 7, 1);
(5, NULL, 1, 1),
(5, NULL, 1, 2);

-- Doctor 3: Dr. Ava Smith
INSERT INTO review (rating, comment, doctor_id, user_id)
VALUES

(5, NULL, 1, 1),
(5, NULL, 1, 2);

