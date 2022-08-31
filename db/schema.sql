DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE roles (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departments_id INT UNSIGNED NOT NULL,
    INDEX dep_ind (departments_id),
    CONSTRAINT fk_departments FOREIGN KEY (departments_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    CONSTRAINT fk_manager FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

/*
CREATE TABLE `employee`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `department_id`
    FOREIGN KEY (`id`)
    REFERENCES `employee`.`departments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
*/