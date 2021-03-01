
-- DISPLAY ROLES
SELECT title, roles.id, roles.name, roles.salary 
    FROM roles LEFT JOIN departments 
    ON roles.department_id = departments.id;

-- DISPLAY EMPLOYEES
SELECT e.id AS 'Employee ID', 
       e.first_name AS 'First Name', 
       e.last_name AS 'Last Name',
       title AS 'Job Title', 
       d.name AS Department, 
       CONCAT('$', FORMAT(salary, 2)) AS Salary,
       CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM employees e
LEFT JOIN roles r
    ON e.role_id = r.id
LEFT JOIN departments d
    ON r.department_id = d.id
LEFT JOIN employees m
    ON e.manager_id = m.id
ORDER BY 
   m.last_name;

--DISPLAY EMPLOYEES BY DEPARTMENT
SELECT e.id AS 'Employee ID', 
       e.first_name AS 'First Name', 
       e.last_name AS 'Last Name',
       title AS 'Job Title', 
       CONCAT('$', FORMAT(salary, 2)) AS Salary,
       CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM employees e
LEFT JOIN roles r
    ON e.role_id = r.id
JOIN departments d
    ON r.department_id = d.id
    AND d.id = 3
LEFT JOIN employees m
    ON e.manager_id = m.id
ORDER BY 
   m.last_name;

-- DISPLAY EMPLOYEES BY MANAGER
SELECT e.id AS 'Employee ID', 
       e.first_name AS 'First Name', 
       e.last_name AS 'Last Name',
       title AS 'Job Title', 
       d.name AS Department, 
       CONCAT('$', FORMAT(salary, 2)) AS Salary
FROM employees e
LEFT JOIN roles r
    ON e.role_id = r.id
LEFT JOIN departments d
    ON r.department_id = d.id
JOIN employees m
    ON e.manager_id = m.id
    AND e.manager_id = 4
ORDER BY 
   m.last_name;

-- GET BUDGET
SELECT salary
FROM employees e
JOIN roles r
    ON e.role_id = r.id
    AND r.department_id = 3;
