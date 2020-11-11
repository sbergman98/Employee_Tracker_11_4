DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE DATABASE employee_tracker_DB;
USE employee_tracker_DB;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
dept_name VARCHAR(30),
PRIMARY KEY(id)
);

CREATE TABLE server (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
PRIMARY KEY(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT, 
manager_id INT,
PRIMARY KEY (id)
);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", "19", "0011"), 
       ("Angela", "Kingsey", "20", "1134"), 
       ("Andy", "Bernard", "52", "4593"),
       ("Kevin", "Malone", "91", "6782"), 
       ("Karen", "Filippelli", "34", "98734"),
       ("Creed", "Bratton", "82", "0011");

SELECT roles.title, roles.salary, department.dept_name FROM roles
LEFT JOIN department
ON roles.department_id = department.id; 

INSERT INTO department (dept_name)
VALUES ("Sales"), ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", "2000", 1), ("Salesperson", "1000", 2), ("Regional Manager","4000", 3), ("HR Manager","3000", 3);

SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.dept_name, 
manager.first_name AS manager_firstname, manager.last_name AS manager_lastname FROM employee

LEFT JOIN roles 
ON employee.role_id = roles.id

LEFT JOIN department
ON roles.department_id = department.id

LEFT JOIN employee manager 
ON employee.manager_id = manager.id;