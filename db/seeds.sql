INSERT INTO departments (name) VALUES
('Pharmacy'),
('SBI'),
('Architecture'),
('Journalism'),
('Nursing'),
('Law');

INSERT INTO roles (title, salary, departments_id) VALUES ('Professor', 120000, 2),
('IT Director', 100000, 2),
('Researcher', 5000, 3),
('Assistant Professor', 75000, 4),
('IT Coordinator', 115000, 1);

INSERT INTO employees (first_name, last_name, role_id) VALUES 
('Jason', 'Smith', 2),
('Kathy', 'Reid', 3),
('Timothy', 'Nowlin', 4),
('Keith', 'Berry', 1),
('Carson', 'Johnson', 4),
('Cynthia', 'Greer', 3),
('Mark', 'Pate', 3),
('Randy', 'Dortch', 1);
