
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
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT DEFAULT NULL
);
select * from users
CREATE TABLE review (
    rating_id SERIAL PRIMARY KEY,
    rating INT DEFAULT 1 CHECK (rating >= 1 AND rating <= 5),
    comment TEXT DEFAULT NULL,
    doctor_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors (doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
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

-- Doctor 3: Dr. Ava Smith
INSERT INTO review (rating, comment, doctor_id, user_id)
VALUES

(5, NULL, 1, 1),
(5, NULL, 1, 2);

drop view view_doctor
CREATE OR REPLACE VIEW view_doctor AS
SELECT 
	d.doctor_id,
    d.name,
    d.speciality,
    d.degree,
    d.experience,
    d.gender,
    d.location,
    COALESCE(ROUND(AVG(r.rating))::INT, 0) AS avgrating,
	 COALESCE(STRING_AGG(DISTINCT dis.disease_name, ', '), 'N/A') AS disease_name
FROM 
    doctors d
LEFT JOIN 
    review r ON d.doctor_id = r.doctor_id
LEFT JOIN 
    diseases dis ON d.speciality = dis.speciality
GROUP BY 
    d.doctor_id, d.name, d.speciality, d.degree, d.experience, d.gender, d.location;
select * from view_doctor
	
select * from doctors

CREATE TABLE slots (
    slot_id SERIAL PRIMARY KEY,
    slot_time TIME NOT NULL
);
INSERT INTO slots (slot_time)
VALUES 
    ('08:00:00'),
    ('08:30:00'),
    ('09:00:00'),
    ('09:30:00'),
    ('10:00:00'),
    ('10:30:00'),
    ('11:00:00'),
    ('11:30:00');
INSERT INTO slots (slot_time)
VALUES 
    ('15:00:00'),
    ('15:30:00'),
    ('16:00:00'),
    ('16:30:00'),
    ('17:00:00'),
    ('17:30:00'),
    ('18:00:00'),
    ('18:30:00');

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_id INT NOT NULL,
    slot_id INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    appointment_date DATE NOT NULL,
    appointment_type VARCHAR(10) CHECK (appointment_type IN ('online', 'offline')),
    status VARCHAR(10) CHECK (status IN ('pending', 'approved', 'declined')),

    -- Corrected foreign keys
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT fk_doctor FOREIGN KEY (doctor_id) REFERENCES doctors (doctor_id) ON DELETE CASCADE,
    CONSTRAINT fk_slot FOREIGN KEY (slot_id) REFERENCES slots (slot_id) ON DELETE CASCADE
);


CREATE TABLE doctor_availability (
    availability_id SERIAL PRIMARY KEY,
    doctor_id INT NOT NULL,
    working_days VARCHAR(10) CHECK (working_days IN ('weekdays', 'weekends')),
    slot_start TIME NOT NULL,
    slot_end TIME NOT NULL,

    -- Foreign key to reference doctor_id from doctors table
    CONSTRAINT fk_doctor FOREIGN KEY (doctor_id) REFERENCES doctors (doctor_id) ON DELETE CASCADE,

    -- Ensuring that slot_start is before slot_end
    CONSTRAINT check_slot_time CHECK (slot_start < slot_end)
);

select * from doctors
-- Insert random availability data for doctors 1 to 13 (either weekdays OR weekends)
INSERT INTO doctor_availability (doctor_id, working_days, slot_start, slot_end)
VALUES
-- Doctors assigned to weekdays
(1, 'weekdays', '08:00:00', '11:30:00'),
(2, 'weekdays', '09:00:00', '12:00:00'),
(3, 'weekdays', '08:30:00', '11:00:00'),
(4, 'weekdays', '10:00:00', '13:00:00'),
(5, 'weekdays', '15:00:00', '17:30:00'),
(6, 'weekdays', '09:30:00', '11:30:00'),
(7, 'weekdays', '08:00:00', '11:00:00'),

-- Doctors assigned to weekends
(8, 'weekends', '10:00:00', '12:30:00'),
(9, 'weekends', '15:30:00', '18:00:00'),
(10, 'weekends', '09:00:00', '11:30:00'),
(11, 'weekends', '08:00:00', '10:30:00'),
(12, 'weekends', '15:00:00', '18:30:00'),
(13, 'weekends', '10:00:00', '12:00:00');

INSERT INTO appointments (user_id, doctor_id, slot_id, booking_date, appointment_date, appointment_type, status)
VALUES
(1, 9, 10, NOW(), '2025-03-29', 'offline', 'declined'), -- Weekend for Doctor 9
(1, 5, 5, NOW(), '2025-03-30', 'online', 'approved'),  -- Weekday for Doctor 5
-- User 2 appointments
(2, 3, 3, NOW(), '2025-03-31', 'offline', 'pending');  -- Weekday for Doc 3

select *  from appointments

CREATE TABLE diseases (
    disease_id SERIAL PRIMARY KEY,
    disease_name VARCHAR(100) NOT NULL,
    symptoms TEXT NOT NULL,
    speciality VARCHAR(50) NOT NULL
);

INSERT INTO diseases (disease_name, symptoms, speciality)
VALUES
('Lung Cancer', 'Persistent cough, chest pain, weight loss', 'Oncologist'),
('Heart Attack', 'Chest pain, shortness of breath, fatigue', 'Cardiologist'),
('Acne', 'Pimples, blackheads, skin inflammation', 'Dermatologist'),
('Epilepsy', 'Seizures, confusion, loss of awareness', 'Neurologist'),
('Asthma', 'Wheezing, coughing, shortness of breath', 'Pediatrician'),
('Fracture', 'Pain, swelling, inability to move', 'Orthopedic'),
('PCOS', 'Irregular periods, acne, weight gain', 'Gynecologist'),
('Sinusitis', 'Headache, nasal congestion, facial pain', 'ENT Specialist'),
('Depression', 'Persistent sadness, loss of interest, fatigue', 'Psychiatrist'),
('Fever', 'High temperature, chills, sweating', 'General Physician'),
('Diabetes', 'Frequent urination, excessive thirst, fatigue', 'Endocrinologist'),
('Kidney Stones', 'Severe pain, blood in urine, nausea', 'Urologist'),
('Tooth Decay', 'Toothache, sensitivity, cavities', 'Dentist');

select * from slots


