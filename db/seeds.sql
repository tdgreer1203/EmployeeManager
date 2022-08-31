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

INSERT INTO employees (first_name, last_name, role_id, employee_id) VALUES 
('Jason', 'Smith', 0, 3),
('Charles', 'Cooper', 1, 1),
('Chris', 'Johnson', 2, 2),
('Stephanie', 'Jackson', 3, 3),
('Taylor', 'Myles', 4, 1),
('Amanda', 'Pate', 2, 1)