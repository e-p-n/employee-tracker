INSERT INTO departments (name)
VALUES 
    ("Central Services"),
    ("Information Retrieval"),
    ("Information Input"),
    ("Information Transit"),
    ("Ministry of Information"),
    ("Ministry of Health");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Information Retrieval Officer", 80000, 2),
    ("Input Specialist", 45000, 3),
    ("Input Supervisor", 60000, 3),
    ("Deputy Minister of Information", 160000, 5),
    ("Heating Engineer", 47000, 1),
    ("Information Transit Officer", 47000, 4),
    ("Information Retrieval Supervisor", 100000, 2),
    ("Plastic Surgeon", 150000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Eugene", "Helpmann", 4, NULL),
    ("Ian", "Kurtzman", 3, 1),
    ("Sam", "Lowry", 2, 2),
    ("Ian", "Warren", 7, 1),
    ("Jack", "Lint", 1, 4),
    ("Bob", "Spoor", 5, NULL),
    ("Charles", "Lime", 2, 2),
    ("Derrick", "Dowser", 5, 6),
    ("Shirley", "Pogson", 2, 2),
    ("Lewis", "Jaffe", 8, NULL),
    ("Simon", "Jones", 6, 1),
    ("Harry", "Tuttle", 5, NULL);