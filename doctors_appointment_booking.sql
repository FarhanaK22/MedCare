CREATE TABLE users
(
user_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctors(
doctor_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
speciality VARCHAR(100) NOT NULL,
qualification VARCHAR(150) NOT NULL,
experience INT CHECK (experience >= 0) NOT NULL,
email VARCHAR (100) UNIQUE NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
rating INT CHECK (rating BETWEEN 1 AND 5) DEFAULT 1,
location VARCHAR(255) DEFAULT 'MedicareHeart Institute, Okhla Road'
);

CREATE TABLE Slot(
slot_id SERIAL PRIMARY KEY,
slot_date DATE NOT NULL,
start_time TIME NOT NULL,
end_time TIME NOT NULL,
session VARCHAR(10) CHECK (session IN ('morning', 'evening')) NOT NULL
);

CREATE TABLE appointments(
appointment_id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
doctor_id INT NOT NULL,
slot_id INT NOT NULL,
appointment_date DATE NOT NULL,
appointment_type VARCHAR(10) CHECK (appointment_type IN ('offline','online')) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(user_id ) ON DELETE CASCADE,
FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id ) ON DELETE CASCADE,
FOREIGN KEY (slot_id) REFERENCES slots(slot_id ) ON DELETE CASCADE
);
ALTER TABLE Slot RENAME TO slots;
