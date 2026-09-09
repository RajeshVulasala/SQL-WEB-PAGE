// SQL Reference Data - Part 1 (Categories 1 to 5: Topics 1 to 26)
const sqlDataPart1 = [
  // 1. DATABASES AND DESIGN
  {
    id: "create-table",
    session: "D01",
    category: "Databases and Design",
    title: "CREATE TABLE",
    description: "Defines a new database table structure including column names, data types, default values, and integrity constraints.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `CREATE TABLE employees (\n  employee_id INT PRIMARY KEY,\n  first_name VARCHAR(50),\n  last_name VARCHAR(50),\n  hire_date DATE\n);`,
        columns: ["Status", "Table Created", "Columns Count"],
        rows: [["SUCCESS", "employees", "4"]],
        notes: "Creates a standard table with basic column types."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `CREATE TABLE orders (\n  order_id INT PRIMARY KEY,\n  customer_id INT NOT NULL,\n  order_date DATE DEFAULT CURRENT_DATE,\n  total_amount DECIMAL(10,2) CHECK (total_amount >= 0),\n  status VARCHAR(20) DEFAULT 'PENDING'\n);`,
        columns: ["Status", "Table Created", "Constraints Applied"],
        rows: [["SUCCESS", "orders", "NOT NULL, DEFAULT, CHECK"]],
        notes: "Demonstrates default column values and CHECK constraints."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `CREATE TABLE audit_logs (\n  log_id INT AUTO_INCREMENT PRIMARY KEY,\n  action_type VARCHAR(50) NOT NULL,\n  user_id INT,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  ip_address VARCHAR(45) DEFAULT '127.0.0.1',\n  CONSTRAINT chk_action CHECK (action_type IN ('INSERT', 'UPDATE', 'DELETE'))\n);`,
        columns: ["Status", "Table Created", "Table Constraints"],
        rows: [["SUCCESS", "audit_logs", "Named CHECK Constraint (chk_action)"]],
        notes: "Uses AUTO_INCREMENT, TIMESTAMP defaults, and named table-level constraints."
      }
    ]
  },
  {
    id: "primary-key",
    session: "D02",
    category: "Databases and Design",
    title: "Primary Key",
    description: "Uniquely identifies each record row in a table, guaranteeing non-null and non-duplicate primary keys.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `CREATE TABLE departments (\n  dept_id INT PRIMARY KEY,\n  dept_name VARCHAR(100) NOT NULL UNIQUE\n);`,
        columns: ["dept_id", "dept_name"],
        rows: [
          ["10", "Engineering"],
          ["20", "Marketing"]
        ],
        notes: "Defines single-column PRIMARY KEY constraint."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `CREATE TABLE student_courses (\n  student_id INT,\n  course_id INT,\n  enroll_date DATE,\n  PRIMARY KEY (student_id, course_id)\n);`,
        columns: ["student_id", "course_id", "enroll_date"],
        rows: [
          ["101", "CS-201", "2026-01-15"],
          ["101", "MATH-301", "2026-01-16"]
        ],
        notes: "Composite PRIMARY KEY spanning multiple columns."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `ALTER TABLE employees\nADD CONSTRAINT pk_emp_id PRIMARY KEY (employee_id);`,
        columns: ["Status", "Constraint Name", "Target Column"],
        rows: [["ALTER SUCCESS", "pk_emp_id", "employee_id"]],
        notes: "Adding named PRIMARY KEY constraint to an existing table."
      }
    ]
  },
  {
    id: "foreign-key",
    session: "D03",
    category: "Databases and Design",
    title: "Foreign Key",
    description: "Establishes a link between tables to enforce referential integrity across multi-table relationships.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `CREATE TABLE employees (\n  employee_id INT PRIMARY KEY,\n  dept_id INT,\n  name VARCHAR(100),\n  FOREIGN KEY (dept_id) REFERENCES departments(dept_id)\n);`,
        columns: ["employee_id", "name", "dept_id"],
        rows: [
          ["101", "Alice Vance", "10"],
          ["102", "Bob Smith", "20"]
        ],
        notes: "Standard foreign key linking to parent primary key."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `CREATE TABLE order_items (\n  item_id INT PRIMARY KEY,\n  order_id INT,\n  product_id INT,\n  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,\n  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT\n);`,
        columns: ["Constraint Type", "Referenced Table", "On Delete Action"],
        rows: [
          ["FK_orders", "orders", "CASCADE"],
          ["FK_products", "products", "RESTRICT"]
        ],
        notes: "Configuring ON DELETE CASCADE and RESTRICT behaviors."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `CREATE TABLE employees_hierarchy (\n  emp_id INT PRIMARY KEY,\n  manager_id INT,\n  emp_name VARCHAR(100),\n  FOREIGN KEY (manager_id) REFERENCES employees_hierarchy(emp_id) ON DELETE SET NULL\n);`,
        columns: ["emp_id", "emp_name", "manager_id"],
        rows: [
          ["1", "Sarah CEO", "NULL"],
          ["2", "David VP", "1"]
        ],
        notes: "Self-referencing Foreign Key with ON DELETE SET NULL."
      }
    ]
  },

  // 2. READING DATA (DQL)
  {
    id: "select-statement",
    session: "D04",
    category: "Reading Data (DQL)",
    title: "SELECT",
    description: "Retrieves specific columns or calculated expressions from one or more database tables.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, last_name, salary \nFROM employees;`,
        columns: ["first_name", "last_name", "salary"],
        rows: [
          ["Alice", "Vance", "8500.00"],
          ["Bob", "Smith", "6200.00"]
        ],
        notes: "Selecting explicit target columns."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT * FROM employees;`,
        columns: ["employee_id", "first_name", "last_name", "dept_id", "salary"],
        rows: [
          ["101", "Alice", "Vance", "10", "8500.00"],
          ["102", "Bob", "Smith", "20", "6200.00"]
        ],
        notes: "Selecting all available columns using wildcard star (*)."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT salary, salary * 1.10, salary + 500 \nFROM employees;`,
        columns: ["salary", "salary * 1.10", "salary + 500"],
        rows: [["8500.00", "9350.00", "9000.00"]],
        notes: "Selecting computed arithmetic expressions."
      }
    ]
  },
  {
    id: "as-alias",
    session: "D05",
    category: "Reading Data (DQL)",
    title: "AS (Alias)",
    description: "Renames result columns or table references with temporary custom aliases for improved readability.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name AS fname, salary AS monthly_pay \nFROM employees;`,
        columns: ["fname", "monthly_pay"],
        rows: [
          ["Alice", "8500.00"],
          ["Bob", "6200.00"]
        ],
        notes: "Renaming columns using AS keyword."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT \n  first_name || ' ' || last_name AS full_name,\n  salary * 12 AS annual_salary\nFROM employees;`,
        columns: ["full_name", "annual_salary"],
        rows: [["Alice Vance", "102000.00"]],
        notes: "Aliasing computed concatenated fields and arithmetic expressions."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT e.first_name, d.dept_name\nFROM employees AS e\nJOIN departments AS d ON e.dept_id = d.dept_id;`,
        columns: ["first_name", "dept_name"],
        rows: [["Alice", "Engineering"]],
        notes: "Table aliasing (e, d) to simplify multi-table queries."
      }
    ]
  },
  {
    id: "where-clause",
    session: "D06",
    category: "Reading Data (DQL)",
    title: "WHERE",
    description: "Filters row records returned by evaluating conditional expressions (AND, OR, NOT, comparisons).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT employee_id, first_name, salary \nFROM employees \nWHERE salary > 7000;`,
        columns: ["employee_id", "first_name", "salary"],
        rows: [
          ["101", "Alice", "8500.00"],
          ["103", "Charlie", "9400.00"]
        ],
        notes: "Basic numerical filter."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT employee_id, first_name, dept_id, salary \nFROM employees \nWHERE (dept_id = 10 OR dept_id = 20) AND salary >= 6500;`,
        columns: ["employee_id", "first_name", "dept_id", "salary"],
        rows: [["101", "Alice", "10", "8500.00"]],
        notes: "Combining logical AND and OR operators with parentheses."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT * FROM orders \nWHERE status NOT IN ('CANCELLED', 'REFUNDED') \n  AND total_amount > 500.00;`,
        columns: ["order_id", "customer_id", "total_amount", "status"],
        rows: [["1001", "501", "1250.00", "COMPLETED"]],
        notes: "Filtering with NOT IN combined with scalar bounds."
      }
    ]
  },
  {
    id: "order-by",
    session: "D07",
    category: "Reading Data (DQL)",
    title: "ORDER BY",
    description: "Sorts query results in ascending (ASC) or descending (DESC) order by one or multiple columns.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, salary \nFROM employees \nORDER BY salary DESC;`,
        columns: ["first_name", "salary"],
        rows: [
          ["Charlie", "9400.00"],
          ["Alice", "8500.00"],
          ["Bob", "6200.00"]
        ],
        notes: "Sorting rows in descending numeric order."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT dept_id, last_name, salary \nFROM employees \nORDER BY dept_id ASC, salary DESC;`,
        columns: ["dept_id", "last_name", "salary"],
        rows: [
          ["10", "Brown", "9400.00"],
          ["10", "Vance", "8500.00"],
          ["20", "Smith", "6200.00"]
        ],
        notes: "Multi-column sorting (dept_id ascending, then salary descending)."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT first_name, manager_id \nFROM employees \nORDER BY manager_id IS NULL DESC, first_name ASC;`,
        columns: ["first_name", "manager_id"],
        rows: [
          ["Sarah", "NULL"],
          ["Alice", "1"],
          ["Bob", "1"]
        ],
        notes: "Custom NULL sorting precedence."
      }
    ]
  },
  {
    id: "limit-offset",
    session: "D08",
    category: "Reading Data (DQL)",
    title: "LIMIT",
    description: "Restricts the maximum number of rows returned, often paired with OFFSET for pagination.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, salary \nFROM employees \nORDER BY salary DESC \nLIMIT 3;`,
        columns: ["first_name", "salary"],
        rows: [
          ["Charlie", "9400.00"],
          ["Alice", "8500.00"],
          ["David", "7900.00"]
        ],
        notes: "Fetches top 3 highest rows."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT order_id, total_amount \nFROM orders \nORDER BY order_date DESC \nLIMIT 5 OFFSET 10;`,
        columns: ["order_id", "total_amount"],
        rows: [
          ["1011", "620.00"],
          ["1012", "590.00"]
        ],
        notes: "Paginated query skipping first 10 records."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT * FROM products \nWHERE stock_quantity > 0 \nORDER BY product_id \nLIMIT 1;`,
        columns: ["product_id", "product_name", "stock_quantity"],
        rows: [["1", "Keyboard", "45"]],
        notes: "Fetching single first matching record."
      }
    ]
  },
  {
    id: "distinct",
    session: "D09",
    category: "Reading Data (DQL)",
    title: "DISTINCT",
    description: "Eliminates duplicate rows from query results, returning unique values only.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT DISTINCT dept_id \nFROM employees;`,
        columns: ["dept_id"],
        rows: [
          ["10"],
          ["20"],
          ["30"]
        ],
        notes: "Returns unique department IDs."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT DISTINCT dept_id, job_title \nFROM employees;`,
        columns: ["dept_id", "job_title"],
        rows: [
          ["10", "Software Engineer"],
          ["10", "Engineering Lead"],
          ["20", "Marketer"]
        ],
        notes: "Unique combinations across multiple columns."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT COUNT(DISTINCT customer_id) AS active_buyers \nFROM orders;`,
        columns: ["active_buyers"],
        rows: [["412"]],
        notes: "Counting unique non-null occurrences."
      }
    ]
  },
  {
    id: "in-operator",
    session: "D10",
    category: "Reading Data (DQL)",
    title: "IN",
    description: "Filters rows whose column value matches any element within a specified discrete list.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT * FROM employees \nWHERE dept_id IN (10, 20);`,
        columns: ["employee_id", "first_name", "dept_id"],
        rows: [
          ["101", "Alice", "10"],
          ["102", "Bob", "20"]
        ],
        notes: "Matches values against numerical list."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT * FROM orders \nWHERE status IN ('COMPLETED', 'SHIPPED');`,
        columns: ["order_id", "total_amount", "status"],
        rows: [
          ["1001", "1250.00", "COMPLETED"],
          ["1002", "340.50", "SHIPPED"]
        ],
        notes: "Matches string category list."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT * FROM employees \nWHERE dept_id NOT IN (30, 40);`,
        columns: ["employee_id", "first_name", "dept_id"],
        rows: [
          ["101", "Alice", "10"],
          ["102", "Bob", "20"]
        ],
        notes: "Negated list membership with NOT IN."
      }
    ]
  },
  {
    id: "between-operator",
    session: "D11",
    category: "Reading Data (DQL)",
    title: "BETWEEN",
    description: "Filters records falling within an inclusive range (low value AND high value).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT product_name, price \nFROM products \nWHERE price BETWEEN 50.00 AND 200.00;`,
        columns: ["product_name", "price"],
        rows: [
          ["Keyboard", "129.99"],
          ["Mouse", "59.99"]
        ],
        notes: "Inclusive numerical range check."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT order_id, order_date \nFROM orders \nWHERE order_date BETWEEN '2026-01-01' AND '2026-03-31';`,
        columns: ["order_id", "order_date"],
        rows: [
          ["1001", "2026-01-14"],
          ["1003", "2026-02-10"]
        ],
        notes: "Inclusive calendar date range."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT last_name \nFROM employees \nWHERE last_name BETWEEN 'A' AND 'M';`,
        columns: ["last_name"],
        rows: [
          ["Brown"],
          ["Miller"]
        ],
        notes: "Alphabetical string boundary checking."
      }
    ]
  },
  {
    id: "like-pattern",
    session: "D12",
    category: "Reading Data (DQL)",
    title: "LIKE",
    description: "Searches for matching patterns using wildcard characters (% for zero/more chars, _ for single char).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, email \nFROM employees \nWHERE email LIKE '%@techcorp.com';`,
        columns: ["first_name", "email"],
        rows: [["Alice", "alice@techcorp.com"]],
        notes: "Suffix search matching domain name."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT product_code, product_name \nFROM products \nWHERE product_code LIKE 'PROD-_00%';`,
        columns: ["product_code", "product_name"],
        rows: [["PROD-A001", "Smart Watch"]],
        notes: "Combining single-character wildcard (_) with wildcard (%)."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT title FROM documents \nWHERE title LIKE '%\\_v2.pdf' ESCAPE '\\';`,
        columns: ["title"],
        rows: [["annual_report_v2.pdf"]],
        notes: "Escaping literal underscore using ESCAPE clause."
      }
    ]
  },
  {
    id: "is-null",
    session: "D13",
    category: "Reading Data (DQL)",
    title: "IS NULL",
    description: "Tests whether a database column value is NULL (missing or unassigned).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT employee_id, first_name, manager_id \nFROM employees \nWHERE manager_id IS NULL;`,
        columns: ["employee_id", "first_name", "manager_id"],
        rows: [["1", "Sarah CEO", "NULL"]],
        notes: "Finds rows with missing manager pointers."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT customer_id, phone_number \nFROM customers \nWHERE phone_number IS NOT NULL;`,
        columns: ["customer_id", "phone_number"],
        rows: [["501", "+1-555-0192"]],
        notes: "Filtering active non-null phone records."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT order_id, ship_date, status \nFROM orders \nWHERE ship_date IS NULL AND status = 'SHIPPED';`,
        columns: ["order_id", "ship_date", "status"],
        rows: [],
        notes: "Auditing data integrity anomalies."
      }
    ]
  },

  // 3. CHANGING DATA (DML/DDL)
  {
    id: "insert-into",
    session: "D14",
    category: "Changing Data (DML/DDL)",
    title: "INSERT",
    description: "Inserts new record rows into a target database table.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `INSERT INTO departments (dept_id, dept_name, location) \nVALUES (40, 'Human Resources', 'New York');`,
        columns: ["Rows Affected", "Inserted ID", "Dept Name"],
        rows: [["1 row inserted", "40", "Human Resources"]],
        notes: "Single row insertion."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `INSERT INTO employees (employee_id, first_name, last_name, dept_id, salary) \nVALUES \n  (201, 'Elena', 'Rostova', 10, 7800.00),\n  (202, 'Marcus', 'Aurelius', 20, 8200.00);`,
        columns: ["Rows Affected", "Status"],
        rows: [["2 rows inserted", "SUCCESS"]],
        notes: "Bulk multi-row INSERT statement."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `INSERT INTO high_earners (emp_id, full_name, salary)\nSELECT employee_id, first_name || ' ' || last_name, salary\nFROM employees\nWHERE salary > 8000;`,
        columns: ["Rows Affected", "Source Table", "Condition"],
        rows: [["14 rows inserted", "employees", "salary > 8000"]],
        notes: "INSERT INTO ... SELECT subquery migration."
      }
    ]
  },
  {
    id: "update-stmt",
    session: "D15",
    category: "Changing Data (DML/DDL)",
    title: "UPDATE",
    description: "Modifies existing column values in database table rows matching filtering criteria.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `UPDATE employees \nSET salary = 9000.00 \nWHERE employee_id = 101;`,
        columns: ["Rows Updated", "Target ID", "New Salary"],
        rows: [["1 row updated", "101", "9000.00"]],
        notes: "Updating a single record by Primary Key."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `UPDATE employees \nSET salary = salary * 1.10 \nWHERE dept_id = 10;`,
        columns: ["Rows Updated", "Adjustment"],
        rows: [["5 rows updated", "+10% Salary"]],
        notes: "Bulk update with arithmetic expressions."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `UPDATE products \nSET stock_quantity = stock_quantity - (\n  SELECT SUM(quantity) \n  FROM order_items \n  WHERE order_items.product_id = products.product_id\n);`,
        columns: ["Rows Updated", "Dynamic Value Source"],
        rows: [["32 rows updated", "Correlated Subquery"]],
        notes: "Correlated subquery inside UPDATE SET clause."
      }
    ]
  },
  {
    id: "delete-stmt",
    session: "D16",
    category: "Changing Data (DML/DDL)",
    title: "DELETE",
    description: "Removes specific rows from a table based on filtering criteria.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `DELETE FROM employees \nWHERE employee_id = 203;`,
        columns: ["Rows Deleted", "Target Key"],
        rows: [["1 row deleted", "203"]],
        notes: "Deleting single row by Primary Key."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `DELETE FROM sessions \nWHERE last_active < CURRENT_DATE - INTERVAL '30' DAY;`,
        columns: ["Rows Deleted", "Purge Criteria"],
        rows: [["1420 rows deleted", "Inactive > 30 days"]],
        notes: "Date threshold cleanup."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `DELETE FROM customers \nWHERE customer_id NOT IN (\n  SELECT DISTINCT customer_id FROM orders\n);`,
        columns: ["Rows Deleted", "Filter Subquery"],
        rows: [["45 rows deleted", "No orders recorded"]],
        notes: "Subquery-driven purge of orphaned records."
      }
    ]
  },
  {
    id: "alter-table",
    session: "D17",
    category: "Changing Data (DML/DDL)",
    title: "ALTER TABLE",
    description: "Modifies table structural definitions (add, drop, rename columns or constraints).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `ALTER TABLE employees \nADD COLUMN email VARCHAR(255) UNIQUE;`,
        columns: ["Status", "Action", "Column Added"],
        rows: [["SUCCESS", "ADD COLUMN", "email"]],
        notes: "Adding a new column with constraint."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `ALTER TABLE employees \nDROP COLUMN status,\nRENAME COLUMN phone TO contact_number;`,
        columns: ["Status", "Actions Executed"],
        rows: [["SUCCESS", "DROP status, RENAME phone"]],
        notes: "Executing multiple table modifications."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `ALTER TABLE orders \nMODIFY COLUMN total_amount NUMERIC(12,2) NOT NULL;`,
        columns: ["Status", "Action", "New Definition"],
        rows: [["SUCCESS", "MODIFY COLUMN", "NUMERIC(12,2) NOT NULL"]],
        notes: "Altering column data type and nullability constraints."
      }
    ]
  },

  // 4. STRING FUNCTIONS
  {
    id: "upper-lower",
    session: "D18",
    category: "String Functions",
    title: "UPPER and LOWER",
    description: "Converts text strings to uppercase or lowercase characters.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, UPPER(first_name) AS upper_fname, LOWER(email) AS lower_email \nFROM employees;`,
        columns: ["first_name", "upper_fname", "lower_email"],
        rows: [["Alice", "ALICE", "alice@techcorp.com"]],
        notes: "Casing conversion."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT * FROM users \nWHERE LOWER(username) = LOWER('JohnDoe_99');`,
        columns: ["user_id", "username", "status"],
        rows: [["42", "johndoe_99", "ACTIVE"]],
        notes: "Case-insensitive lookup."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT \n  UPPER(SUBSTR(first_name, 1, 1)) || LOWER(SUBSTR(first_name, 2)) AS formatted \nFROM employees;`,
        columns: ["formatted"],
        rows: [["Alice"]],
        notes: "Custom Title-Casing."
      }
    ]
  },
  {
    id: "length-func",
    session: "D19",
    category: "String Functions",
    title: "LENGTH",
    description: "Returns the number of characters in a string.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT product_name, LENGTH(product_name) AS char_count \nFROM products;`,
        columns: ["product_name", "char_count"],
        rows: [["Keyboard", "8"]],
        notes: "Character count calculation."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT user_id, password_hash \nFROM users \nWHERE LENGTH(password_hash) < 64;`,
        columns: ["user_id", "password_hash"],
        rows: [],
        notes: "Hash length validation."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT email \nFROM customers \nORDER BY LENGTH(email) DESC \nLIMIT 1;`,
        columns: ["email"],
        rows: [["alexander.christopher@international-tech.org"]],
        notes: "Finding longest string values."
      }
    ]
  },
  {
    id: "substr-func",
    session: "D20",
    category: "String Functions",
    title: "SUBSTR",
    description: "Extracts a substring starting at a specified character position.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT phone_number, SUBSTR(phone_number, 1, 3) AS area_code \nFROM customers;`,
        columns: ["phone_number", "area_code"],
        rows: [["555-0192", "555"]],
        notes: "Fixed length prefix extraction."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT sku, SUBSTR(sku, 5, 4) AS cat_code \nFROM inventory;`,
        columns: ["sku", "cat_code"],
        rows: [["ITEM-ELEC-901", "ELEC"]],
        notes: "Parsing structured SKU codes."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT email, SUBSTR(email, INSTR(email, '@') + 1) AS domain \nFROM users;`,
        columns: ["email", "domain"],
        rows: [["alice@gmail.com", "gmail.com"]],
        notes: "Dynamic substring extraction based on search index."
      }
    ]
  },
  {
    id: "concat-func",
    session: "D21",
    category: "String Functions",
    title: "String Concatenation (|| or CONCAT)",
    description: "Joins two or more text values into a single concatenated string.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name || ' ' || last_name AS full_name \nFROM employees;`,
        columns: ["full_name"],
        rows: [["Alice Vance"]],
        notes: "Standard SQL string concatenation (||)."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT CONCAT(city, ', ', state, ' ', zip_code) AS full_address \nFROM addresses;`,
        columns: ["full_address"],
        rows: [["Austin, TX 78701"]],
        notes: "Multi-argument CONCAT function."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT CONCAT_WS(' - ', order_id, status, UPPER(payment_method)) AS summary \nFROM orders;`,
        columns: ["summary"],
        rows: [["1001 - COMPLETED - CREDIT_CARD"]],
        notes: "CONCAT_WS with separator."
      }
    ]
  },
  {
    id: "trim-func",
    session: "D22",
    category: "String Functions",
    title: "TRIM",
    description: "Removes leading and trailing whitespaces or specified characters from strings.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT TRIM('   Hello World!   ') AS cleaned_text;`,
        columns: ["cleaned_text"],
        rows: [["Hello World!"]],
        notes: "Trimming spaces from both ends."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT user_id, LTRIM(username) AS l_clean, RTRIM(username) AS r_clean \nFROM user_imports;`,
        columns: ["user_id", "l_clean", "r_clean"],
        rows: [["10", "john_doe", "john_doe"]],
        notes: "Directional whitespace cleaning."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT TRIM(BOTH '$' FROM price_raw) AS numeric_price \nFROM raw_scraped_data;`,
        columns: ["numeric_price"],
        rows: [["199.99"]],
        notes: "Stripping non-whitespace custom characters."
      }
    ]
  },
  {
    id: "replace-func",
    session: "D23",
    category: "String Functions",
    title: "REPLACE",
    description: "Replaces all occurrences of a specified substring with a new replacement string.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT REPLACE(phone_number, '-', '') AS clean_phone \nFROM customers;`,
        columns: ["clean_phone"],
        rows: [["555019288"]],
        notes: "Removing hyphens."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT REPLACE(url_slug, '_', '-') AS SEO_slug \nFROM blog_posts;`,
        columns: ["SEO_slug"],
        rows: [["sql-cheat-sheet"]],
        notes: "Standardizing URL slugs."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT REPLACE(REPLACE(phone, '(', ''), ') ', '-') AS formatted \nFROM contacts;`,
        columns: ["formatted"],
        rows: [["555-1234567"]],
        notes: "Nested multi-stage string replacement."
      }
    ]
  },

  // 5. DATE FUNCTIONS
  {
    id: "extract-date",
    session: "D24",
    category: "Date Functions",
    title: "Extracting Date Parts",
    description: "Extracts individual components like YEAR, MONTH, DAY, or HOUR from date/time fields.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT order_id, EXTRACT(YEAR FROM order_date) AS order_year \nFROM orders;`,
        columns: ["order_id", "order_year"],
        rows: [["1001", "2026"]],
        notes: "Standard EXTRACT for year component."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT STRFTIME('%Y-%m', order_date) AS year_month, COUNT(*) FROM orders GROUP BY year_month;`,
        columns: ["year_month", "COUNT(*)"],
        rows: [["2026-01", "142"]],
        notes: "Formatting year-month strings."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT order_id, order_date FROM orders WHERE EXTRACT(DOW FROM order_date) IN (0, 6);`,
        columns: ["order_id", "order_date"],
        rows: [["1005", "2026-01-17"]],
        notes: "Filtering weekend orders."
      }
    ]
  },
  {
    id: "current-date",
    session: "D25",
    category: "Date Functions",
    title: "Current Date (DATE / NOW)",
    description: "Returns active system calendar date and timestamp values.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT CURRENT_DATE AS today, CURRENT_TIMESTAMP AS now_time;`,
        columns: ["today", "now_time"],
        rows: [["2026-09-09", "2026-09-09 23:10:47"]],
        notes: "Fetching current date and timestamp."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `INSERT INTO order_logs (order_id, log_time) VALUES (501, CURRENT_TIMESTAMP);`,
        columns: ["Status", "Timestamp"],
        rows: [["1 row inserted", "CURRENT_TIMESTAMP"]],
        notes: "Logging active operations with exact timestamps."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT * FROM subscriptions WHERE expiry_date < CURRENT_DATE;`,
        columns: ["sub_id", "expiry_date"],
        rows: [["99", "2026-08-31"]],
        notes: "Comparing table dates against current system date."
      }
    ]
  },
  {
    id: "date-diff",
    session: "D26",
    category: "Date Functions",
    title: "Date Difference (DATEDIFF)",
    description: "Calculates day differences between dates or performs date addition/subtraction.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT order_id, DATEDIFF(ship_date, order_date) AS days_elapsed \nFROM orders;`,
        columns: ["order_id", "days_elapsed"],
        rows: [["101", "3"]],
        notes: "DATEDIFF calculating elapsed days."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT customer_id FROM customers WHERE join_date >= CURRENT_DATE - INTERVAL '90' DAY;`,
        columns: ["customer_id"],
        rows: [["881"]],
        notes: "Interval arithmetic filtering recent users."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT emp_id, JULIANDAY(CURRENT_DATE) - JULIANDAY(hire_date) AS tenure_days FROM employees;`,
        columns: ["emp_id", "tenure_days"],
        rows: [["101", "1450"]],
        notes: "Julian Day float duration subtraction."
      }
    ]
  }
];
