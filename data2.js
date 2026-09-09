// SQL Reference Data - Part 2 (Categories 6 to 12: Topics 27 to 56)
const sqlDataPart2 = [
  // 6. CONTROL FLOW
  {
    id: "case-when",
    session: "D27",
    category: "Control Flow",
    title: "CASE WHEN",
    description: "Implements conditional IF-THEN-ELSE branching logic directly inside SQL queries.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, salary,\n  CASE \n    WHEN salary >= 8000 THEN 'High Tier'\n    WHEN salary >= 6000 THEN 'Mid Tier'\n    ELSE 'Entry Tier'\n  END AS salary_grade\nFROM employees;`,
        columns: ["first_name", "salary", "salary_grade"],
        rows: [
          ["Alice", "8500.00", "High Tier"],
          ["Bob", "6200.00", "Mid Tier"]
        ],
        notes: "Categorizing numeric values into discrete tiers."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT \n  SUM(CASE WHEN status = 'COMPLETED' THEN total_amount ELSE 0 END) AS revenue_completed,\n  SUM(CASE WHEN status = 'REFUNDED' THEN total_amount ELSE 0 END) AS total_refunds\nFROM orders;`,
        columns: ["revenue_completed", "total_refunds"],
        rows: [["45820.00", "1250.00"]],
        notes: "Conditional aggregation (pivot column simulation)."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT order_id,\n  CASE status\n    WHEN 'SHIPPED' THEN 'In Transit'\n    WHEN 'DELIVERED' THEN 'Arrived'\n    ELSE 'Processing'\n  END AS tracking_status\nFROM orders;`,
        columns: ["order_id", "tracking_status"],
        rows: [
          ["1001", "In Transit"],
          ["1002", "Arrived"]
        ],
        notes: "Simple CASE expression matching literal values."
      }
    ]
  },
  {
    id: "coalesce-func",
    session: "D28",
    category: "Control Flow",
    title: "COALESCE & NULLIF",
    description: "Evaluates arguments in order and returns the first non-NULL value (COALESCE) or returns NULL if equal (NULLIF).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, COALESCE(phone_number, 'N/A') AS contact_phone \nFROM customers;`,
        columns: ["first_name", "contact_phone"],
        rows: [
          ["Alice", "+1-555-0192"],
          ["Bob", "N/A"]
        ],
        notes: "Replacing NULL column values with default fallback string."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT employee_id, COALESCE(mobile, work_phone, home_phone, 'No Contact') AS preferred_phone \nFROM employee_contacts;`,
        columns: ["employee_id", "preferred_phone"],
        rows: [
          ["101", "+1-555-8811"],
          ["102", "No Contact"]
        ],
        notes: "Multi-column fallback precedence chain."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT \n  product_name, \n  total_revenue / NULLIF(units_sold, 0) AS avg_price_per_unit \nFROM sales_summary;`,
        columns: ["product_name", "avg_price_per_unit"],
        rows: [
          ["Keyboard", "89.99"],
          ["Discontinued Item", "NULL"]
        ],
        notes: "Preventing Division by Zero runtime errors using NULLIF."
      }
    ]
  },

  // 7. AGGREGATE FUNCTIONS
  {
    id: "count-func",
    session: "D29",
    category: "Aggregate Functions",
    title: "COUNT",
    description: "Returns the total number of rows or non-null column values matching filter criteria.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT COUNT(*) AS total_employees FROM employees;`,
        columns: ["total_employees"],
        rows: [["48"]],
        notes: "Counts total rows regardless of NULL values."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT COUNT(*) AS total_orders, COUNT(shipped_date) AS total_shipped FROM orders;`,
        columns: ["total_orders", "total_shipped"],
        rows: [["500", "468"]],
        notes: "Comparing total rows against non-null column count."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT COUNT(DISTINCT dept_id) AS active_departments FROM employees WHERE salary > 5000;`,
        columns: ["active_departments"],
        rows: [["6"]],
        notes: "COUNT(DISTINCT) with conditional predicate."
      }
    ]
  },
  {
    id: "sum-func",
    session: "D30",
    category: "Aggregate Functions",
    title: "SUM",
    description: "Calculates the total mathematical sum of numerical values across a dataset.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT SUM(salary) AS total_payroll FROM employees;`,
        columns: ["total_payroll"],
        rows: [["360000.00"]],
        notes: "Standard total sum on numeric columns."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT dept_id, SUM(salary) AS dept_payroll FROM employees GROUP BY dept_id;`,
        columns: ["dept_id", "dept_payroll"],
        rows: [
          ["10", "150000.00"],
          ["20", "85000.00"]
        ],
        notes: "Grouped departmental sum."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT SUM(quantity * unit_price) AS gross_revenue FROM order_items;`,
        columns: ["gross_revenue"],
        rows: [["124590.50"]],
        notes: "Aggregating expression containing column multiplication."
      }
    ]
  },
  {
    id: "avg-func",
    session: "D31",
    category: "Aggregate Functions",
    title: "AVG",
    description: "Calculates the arithmetic mean average of numeric values in a column.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT AVG(salary) AS average_salary FROM employees;`,
        columns: ["average_salary"],
        rows: [["7500.00"]],
        notes: "Simple mean salary calculation."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT dept_id, ROUND(AVG(salary), 2) AS dept_avg_salary FROM employees GROUP BY dept_id;`,
        columns: ["dept_id", "dept_avg_salary"],
        rows: [
          ["10", "8500.00"],
          ["20", "6450.50"]
        ],
        notes: "Grouped average rounded to 2 decimal places."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT AVG(total_amount) AS avg_completed_order FROM orders WHERE status = 'COMPLETED';`,
        columns: ["avg_completed_order"],
        rows: [["890.25"]],
        notes: "Filtered average on subset of records."
      }
    ]
  },
  {
    id: "min-max",
    session: "D32",
    category: "Aggregate Functions",
    title: "MIN and MAX",
    description: "Retrieves the minimum (smallest) and maximum (largest) values in a column.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT MIN(salary) AS lowest_salary, MAX(salary) AS highest_salary FROM employees;`,
        columns: ["lowest_salary", "highest_salary"],
        rows: [["3200.00", "15000.00"]],
        notes: "Finding extreme values across numeric fields."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT MIN(order_date) AS earliest_order, MAX(order_date) AS latest_order FROM orders;`,
        columns: ["earliest_order", "latest_order"],
        rows: [["2024-01-03", "2026-09-08"]],
        notes: "MIN and MAX on date data types."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT MIN(last_name) AS first_alpha, MAX(last_name) AS last_alpha FROM employees;`,
        columns: ["first_alpha", "last_alpha"],
        rows: [["Adams", "Zimmerman"]],
        notes: "MIN and MAX on string columns using lexicographical sorting."
      }
    ]
  },
  {
    id: "group-by",
    session: "D33",
    category: "Aggregate Functions",
    title: "GROUP BY",
    description: "Groups rows sharing identical values into summary rows for aggregate computation.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT dept_id, COUNT(*) AS emp_count FROM employees GROUP BY dept_id;`,
        columns: ["dept_id", "emp_count"],
        rows: [
          ["10", "12"],
          ["20", "8"]
        ],
        notes: "Standard grouping by single categorical column."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT dept_id, job_title, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id, job_title;`,
        columns: ["dept_id", "job_title", "avg_sal"],
        rows: [
          ["10", "Dev", "8200.00"],
          ["10", "QA", "6500.00"]
        ],
        notes: "Multi-column GROUP BY clause."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT STRFTIME('%Y', hire_date) AS hire_year, COUNT(*) FROM employees GROUP BY hire_year;`,
        columns: ["hire_year", "COUNT(*)"],
        rows: [["2026", "5"]],
        notes: "Grouping by computed expression alias."
      }
    ]
  },
  {
    id: "having-clause",
    session: "D34",
    category: "Aggregate Functions",
    title: "HAVING",
    description: "Filters aggregated groups produced by GROUP BY (unlike WHERE which filters rows before aggregation).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT dept_id, COUNT(*) AS emp_count FROM employees GROUP BY dept_id HAVING COUNT(*) > 10;`,
        columns: ["dept_id", "emp_count"],
        rows: [["10", "12"]],
        notes: "Filtering groups based on aggregate count."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT dept_id, AVG(salary) AS avg_sal FROM employees WHERE status = 'ACTIVE' GROUP BY dept_id HAVING AVG(salary) >= 7500;`,
        columns: ["dept_id", "avg_sal"],
        rows: [["10", "8500.00"]],
        notes: "Combining WHERE (row filter) with HAVING (group filter)."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT customer_id, COUNT(order_id), SUM(total_amount) FROM orders GROUP BY customer_id HAVING COUNT(order_id) >= 5 AND SUM(total_amount) > 1000;`,
        columns: ["customer_id", "COUNT(order_id)", "SUM(total_amount)"],
        rows: [["102", "7", "2450.00"]],
        notes: "Multiple HAVING conditions linked by AND."
      }
    ]
  },

  // 8. SUBQUERIES
  {
    id: "subquery-where",
    session: "D35",
    category: "Subqueries",
    title: "Subquery in WHERE",
    description: "Uses a nested query inside the WHERE filtering predicate.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);`,
        columns: ["first_name", "salary"],
        rows: [
          ["Alice", "8500.00"],
          ["Charlie", "9400.00"]
        ],
        notes: "Filtering against scalar average subquery."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT employee_id, first_name FROM employees WHERE dept_id IN (SELECT dept_id FROM departments WHERE location = 'New York');`,
        columns: ["employee_id", "first_name"],
        rows: [["101", "Alice"]],
        notes: "List subquery with IN operator."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT e1.first_name, e1.dept_id, e1.salary FROM employees e1 WHERE e1.salary > (SELECT AVG(e2.salary) FROM employees e2 WHERE e2.dept_id = e1.dept_id);`,
        columns: ["first_name", "dept_id", "salary"],
        rows: [["Alice", "10", "8500.00"]],
        notes: "Correlated subquery evaluating per-department average."
      }
    ]
  },
  {
    id: "nth-highest",
    session: "D36",
    category: "Subqueries",
    title: "N-th / Second Highest Value",
    description: "Calculates N-th highest or lowest scalar value using subqueries or OFFSET patterns.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT MAX(salary) AS second_highest_salary FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);`,
        columns: ["second_highest_salary"],
        rows: [["8500.00"]],
        notes: "Classic MAX subquery for 2nd highest salary."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2;`,
        columns: ["salary"],
        rows: [["7900.00"]],
        notes: "3rd highest salary using LIMIT/OFFSET."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT first_name, salary FROM employees e1 WHERE 1 = (SELECT COUNT(DISTINCT e2.salary) FROM employees e2 WHERE e2.salary > e1.salary);`,
        columns: ["first_name", "salary"],
        rows: [["Alice", "8500.00"]],
        notes: "General N-th highest calculation (N-1 count pattern)."
      }
    ]
  },
  {
    id: "subquery-in",
    session: "D37",
    category: "Subqueries",
    title: "Subquery with IN & EXISTS",
    description: "Evaluates set membership (IN) or row existence (EXISTS / NOT EXISTS).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT customer_name FROM customers WHERE customer_id IN (SELECT customer_id FROM orders);`,
        columns: ["customer_name"],
        rows: [["Acme Corp"]],
        notes: "IN subquery returning list of active IDs."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT c.customer_name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id AND o.total_amount > 1000);`,
        columns: ["customer_name"],
        rows: [["Acme Corp"]],
        notes: "EXISTS clause short-circuit checking."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT d.dept_name FROM departments d WHERE NOT EXISTS (SELECT 1 FROM employees e WHERE e.dept_id = d.dept_id);`,
        columns: ["dept_name"],
        rows: [["Research & Development"]],
        notes: "NOT EXISTS finding entities with zero child rows."
      }
    ]
  },

  // 9. JOINS & SETS
  {
    id: "inner-join",
    session: "D38",
    category: "Joins & Sets",
    title: "INNER JOIN",
    description: "Returns records that have matching values in both left and right tables.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT e.first_name, d.dept_name FROM employees e INNER JOIN departments d ON e.dept_id = d.dept_id;`,
        columns: ["first_name", "dept_name"],
        rows: [
          ["Alice", "Engineering"],
          ["Bob", "Marketing"]
        ],
        notes: "Standard two-table INNER JOIN."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT o.order_id, c.customer_name, p.product_name FROM orders o JOIN customers c ON o.customer_id = c.customer_id JOIN order_items i ON o.order_id = i.order_id JOIN products p ON i.product_id = p.product_id;`,
        columns: ["order_id", "customer_name", "product_name"],
        rows: [["1001", "Acme Corp", "Keyboard"]],
        notes: "Multi-table relational join chain."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT e.first_name, d.dept_name FROM employees e JOIN departments d ON e.dept_id = d.dept_id AND d.location = 'New York';`,
        columns: ["first_name", "dept_name"],
        rows: [["Alice", "Engineering"]],
        notes: "INNER JOIN with extra ON clause predicate."
      }
    ]
  },
  {
    id: "left-join",
    session: "D39",
    category: "Joins & Sets",
    title: "LEFT JOIN",
    description: "Returns all records from the left table, and matched records from the right table (filling NULL for missing right rows).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT e.first_name, d.dept_name FROM employees e LEFT JOIN departments d ON e.dept_id = d.dept_id;`,
        columns: ["first_name", "dept_name"],
        rows: [
          ["Alice", "Engineering"],
          ["Frank", "NULL"]
        ],
        notes: "Preserves left employees even if dept_id is unassigned/NULL."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT c.customer_id, c.customer_name, COUNT(o.order_id) AS total_orders FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.customer_name;`,
        columns: ["customer_id", "customer_name", "total_orders"],
        rows: [
          ["501", "Acme Corp", "12"],
          ["502", "Newbie LLC", "0"]
        ],
        notes: "Aggregating LEFT JOIN results to include 0-count entities."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT e.first_name, d.dept_name FROM employees e LEFT JOIN departments d ON e.dept_id = d.dept_id AND d.is_active = TRUE;`,
        columns: ["first_name", "dept_name"],
        rows: [["Alice", "Engineering"]],
        notes: "LEFT JOIN with conditional ON filter."
      }
    ]
  },
  {
    id: "unmatched-rows",
    session: "D40",
    category: "Joins & Sets",
    title: "Unmatched Rows (LEFT JOIN WHERE IS NULL)",
    description: "Identifies orphan or non-matching records in the left table by checking right table key for NULL.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT c.customer_id, c.customer_name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;`,
        columns: ["customer_id", "customer_name"],
        rows: [["502", "Newbie LLC"]],
        notes: "Finds customers who placed 0 orders."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT p.product_id, p.product_name FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id WHERE oi.product_id IS NULL;`,
        columns: ["product_id", "product_name"],
        rows: [["99", "Legacy Cable"]],
        notes: "Identifying unsold product inventory."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT e.employee_id, e.first_name FROM employees e LEFT JOIN project_assignments pa ON e.employee_id = pa.emp_id WHERE pa.project_id IS NULL AND e.status = 'ACTIVE';`,
        columns: ["employee_id", "first_name"],
        rows: [["204", "Elena"]],
        notes: "Finding active staff with 0 project assignments."
      }
    ]
  },
  {
    id: "self-join",
    session: "D41",
    category: "Joins & Sets",
    title: "Self Join",
    description: "Joins a table to itself to compare rows within the same dataset (e.g., employee-manager hierarchy).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT e.first_name AS employee, m.first_name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;`,
        columns: ["employee", "manager"],
        rows: [
          ["Bob", "Alice"],
          ["Alice", "NULL"]
        ],
        notes: "Standard employee-to-manager hierarchy self join."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT e1.first_name AS emp1, e2.first_name AS emp2, e1.dept_id FROM employees e1 JOIN employees e2 ON e1.dept_id = e2.dept_id AND e1.employee_id < e2.employee_id;`,
        columns: ["emp1", "emp2", "dept_id"],
        rows: [["Alice", "David", "10"]],
        notes: "Finding employee pairs within same department."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT t1.order_id AS order1, t2.order_id AS order2, t1.customer_id FROM orders t1 JOIN orders t2 ON t1.customer_id = t2.customer_id AND t1.order_id <> t2.order_id AND t1.order_date = t2.order_date;`,
        columns: ["order1", "order2", "customer_id"],
        rows: [["1001", "1004", "501"]],
        notes: "Detecting duplicate orders placed on same day."
      }
    ]
  },
  {
    id: "union-sets",
    session: "D42",
    category: "Joins & Sets",
    title: "UNION & UNION ALL",
    description: "Combines result sets of two or more SELECT queries into a single combined output.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, last_name, 'Employee' AS role FROM employees \nUNION \nSELECT first_name, last_name, 'Customer' AS role FROM customers;`,
        columns: ["first_name", "last_name", "role"],
        rows: [
          ["Alice", "Vance", "Employee"],
          ["Bob", "Smith", "Customer"]
        ],
        notes: "UNION removes duplicate rows."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT order_id, order_date, 'Online' AS channel FROM online_orders \nUNION ALL \nSELECT order_id, order_date, 'In-Store' AS channel FROM retail_orders;`,
        columns: ["order_id", "order_date", "channel"],
        rows: [
          ["ON-101", "2026-01-10", "Online"],
          ["RT-501", "2026-01-10", "In-Store"]
        ],
        notes: "UNION ALL retains all rows without deduplication."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `(SELECT product_name, sales_count FROM top_products ORDER BY sales_count DESC LIMIT 3) \nUNION ALL \n(SELECT product_name, sales_count FROM bottom_products ORDER BY sales_count ASC LIMIT 3);`,
        columns: ["product_name", "sales_count"],
        rows: [
          ["Keyboard", "500"],
          ["Cable", "2"]
        ],
        notes: "Stacking top and bottom subquery subsets."
      }
    ]
  },

  // 10. WINDOW FUNCTIONS
  {
    id: "row-number",
    session: "D43",
    category: "Window Functions",
    title: "ROW_NUMBER()",
    description: "Assigns a unique sequential integer index to each row within a window partition.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num FROM employees;`,
        columns: ["first_name", "salary", "row_num"],
        rows: [
          ["Charlie", "9400.00", "1"],
          ["Alice", "8500.00", "2"]
        ],
        notes: "Global sequential ranking."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT dept_id, first_name, salary, ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank FROM employees;`,
        columns: ["dept_id", "first_name", "salary", "dept_rank"],
        rows: [
          ["10", "Alice", "8500.00", "1"],
          ["10", "David", "7900.00", "2"]
        ],
        notes: "Partitioned ROW_NUMBER resetting index per department."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `WITH ranked_orders AS (SELECT order_id, customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders) SELECT order_id, customer_id FROM ranked_orders WHERE rn = 1;`,
        columns: ["order_id", "customer_id"],
        rows: [["1089", "501"]],
        notes: "Deduplicating to fetch latest order per customer."
      }
    ]
  },
  {
    id: "rank-dense",
    session: "D44",
    category: "Window Functions",
    title: "RANK() and DENSE_RANK()",
    description: "Calculates rank values with gaps (RANK) or without gaps (DENSE_RANK) for tied values.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT first_name, salary, RANK() OVER (ORDER BY salary DESC) AS rk, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rk FROM employees;`,
        columns: ["first_name", "salary", "rk", "dense_rk"],
        rows: [
          ["Alice", "8500.00", "1", "1"],
          ["Bob", "8500.00", "1", "1"],
          ["Charlie", "7900.00", "3", "2"]
        ],
        notes: "Comparing RANK (gap to 3) vs DENSE_RANK (no gap to 2)."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT * FROM (SELECT product_name, category_id, price, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS price_rank FROM products) WHERE price_rank <= 2;`,
        columns: ["product_name", "category_id", "price", "price_rank"],
        rows: [["Laptop Pro", "1", "1299.00", "1"]],
        notes: "Top 2 most expensive products per category."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT student_id, score, PERCENT_RANK() OVER (ORDER BY score) AS percentile FROM exam_results;`,
        columns: ["student_id", "score", "percentile"],
        rows: [["101", "95", "1.00"]],
        notes: "Relative percentile rank calculation."
      }
    ]
  },
  {
    id: "partition-by",
    session: "D45",
    category: "Window Functions",
    title: "PARTITION BY Clause",
    description: "Divides query result rows into groups for independent window calculation.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT dept_id, first_name, salary, AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg FROM employees;`,
        columns: ["dept_id", "first_name", "salary", "dept_avg"],
        rows: [["10", "Alice", "8500.00", "8200.00"]],
        notes: "Appending group average alongside detail rows."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT employee_id, dept_id, salary, salary - AVG(salary) OVER (PARTITION BY dept_id) AS diff_from_avg FROM employees;`,
        columns: ["employee_id", "dept_id", "salary", "diff_from_avg"],
        rows: [["101", "10", "8500.00", "+300.00"]],
        notes: "Deviation from group mean in single pass."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT order_id, customer_id, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_spend FROM orders;`,
        columns: ["order_id", "customer_id", "total_amount", "running_spend"],
        rows: [["1001", "501", "150.00", "150.00"]],
        notes: "Partitioned running total."
      }
    ]
  },
  {
    id: "window-aggregates",
    session: "D46",
    category: "Window Functions",
    title: "Aggregates as Window Functions",
    description: "Applies SUM, AVG, COUNT, MIN, MAX over window frames with moving boundaries.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT order_date, daily_revenue, SUM(daily_revenue) OVER (ORDER BY order_date) AS cumulative_revenue FROM daily_sales;`,
        columns: ["order_date", "daily_revenue", "cumulative_revenue"],
        rows: [["2026-09-01", "1200.00", "1200.00"]],
        notes: "Calculating cumulative running sum."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT sale_date, amount, AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS 3_day_moving_avg FROM sales;`,
        columns: ["sale_date", "amount", "3_day_moving_avg"],
        rows: [["2026-09-03", "300.00", "200.00"]],
        notes: "3-day moving average using explicit ROWS window frame boundaries."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT employee_id, dept_id, salary, MIN(salary) OVER (PARTITION BY dept_id) AS min_dept_sal, MAX(salary) OVER (PARTITION BY dept_id) AS max_dept_sal FROM employees;`,
        columns: ["employee_id", "dept_id", "salary", "min_dept_sal", "max_dept_sal"],
        rows: [["101", "10", "8500.00", "7900.00", "8500.00"]],
        notes: "Multiple window aggregates over shared partition frame."
      }
    ]
  },

  // 11. VIEWS AND ROUTINES
  {
    id: "create-view",
    session: "D47",
    category: "Views and Routines",
    title: "CREATE VIEW",
    description: "Saves a named SELECT query as a virtual table in database schema.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `CREATE VIEW v_active_employees AS SELECT employee_id, first_name, last_name FROM employees WHERE status = 'ACTIVE';`,
        columns: ["Status", "View Name"],
        rows: [["SUCCESS", "v_active_employees"]],
        notes: "Creating virtual table view abstraction."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `CREATE VIEW v_dept_summary AS SELECT d.dept_name, COUNT(e.employee_id) AS staff_count FROM departments d LEFT JOIN employees e ON d.dept_id = e.dept_id GROUP BY d.dept_id, d.dept_name;`,
        columns: ["Status", "View Name"],
        rows: [["SUCCESS", "v_dept_summary"]],
        notes: "Encapsulating complex JOIN & GROUP BY query logic into a view."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `CREATE OR REPLACE VIEW v_secure_customers AS SELECT customer_id, customer_name, '****' || RIGHT(phone, 4) AS masked_phone FROM customers;`,
        columns: ["Status", "View Name"],
        rows: [["SUCCESS", "v_secure_customers"]],
        notes: "Data masking view abstraction."
      }
    ]
  },
  {
    id: "stored-procedures",
    session: "D48",
    category: "Views and Routines",
    title: "Stored Procedures",
    description: "Encapsulates procedural SQL code logic into callable database routines with parameters.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `CREATE PROCEDURE GiveRaise(IN p_emp_id INT, IN p_percent DECIMAL(5,2))\nBEGIN\n  UPDATE employees SET salary = salary * (1 + p_percent / 100) WHERE employee_id = p_emp_id;\nEND;`,
        columns: ["Status", "Routine Name"],
        rows: [["PROCEDURE CREATED", "GiveRaise"]],
        notes: "Standard parameterized stored procedure definition."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `CALL GiveRaise(101, 10.5);`,
        columns: ["Execution Status", "Procedure Called"],
        rows: [["SUCCESS - 1 row updated", "GiveRaise(101, 10.5)"]],
        notes: "Executing procedure with CALL command."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `CREATE PROCEDURE TransferFunds(IN src INT, IN dest INT, IN amt DECIMAL(10,2))\nBEGIN\n  START TRANSACTION;\n  UPDATE accounts SET balance = balance - amt WHERE acc_id = src;\n  UPDATE accounts SET balance = balance + amt WHERE acc_id = dest;\n  COMMIT;\nEND;`,
        columns: ["Status", "Routine Name", "Transaction Control"],
        rows: [["PROCEDURE CREATED", "TransferFunds", "ACID Transaction (START/COMMIT)"]],
        notes: "Stored procedure with transaction control."
      }
    ]
  },
  {
    id: "triggers",
    session: "D49",
    category: "Views and Routines",
    title: "Triggers",
    description: "Automates SQL execution in response to table modifications (BEFORE/AFTER INSERT, UPDATE, DELETE).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `CREATE TRIGGER trg_emp_audit AFTER UPDATE ON employees FOR EACH ROW \nBEGIN\n  INSERT INTO audit_logs (emp_id, old_sal, new_sal) VALUES (OLD.employee_id, OLD.salary, NEW.salary);\nEND;`,
        columns: ["Status", "Trigger Name"],
        rows: [["TRIGGER CREATED", "trg_emp_audit"]],
        notes: "Audit log trigger capturing OLD and NEW state variables."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `CREATE TRIGGER trg_check_stock BEFORE INSERT ON order_items FOR EACH ROW \nBEGIN\n  IF (SELECT stock FROM products WHERE product_id = NEW.product_id) < NEW.quantity THEN\n    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient stock!';\n  END IF;\nEND;`,
        columns: ["Status", "Trigger Name"],
        rows: [["TRIGGER CREATED", "trg_check_stock"]],
        notes: "Validation trigger throwing custom exception."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `CREATE TRIGGER trg_update_timestamp BEFORE UPDATE ON products FOR EACH ROW \nBEGIN\n  SET NEW.updated_at = CURRENT_TIMESTAMP;\nEND;`,
        columns: ["Status", "Trigger Name"],
        rows: [["TRIGGER CREATED", "trg_update_timestamp"]],
        notes: "Automatic metadata timestamp update trigger."
      }
    ]
  },

  // 12. DATA ANALYTICS & ADVANCED ANALYSIS (Data Analyst Specialized)
  {
    id: "ctes-with",
    session: "D50",
    category: "Data Analytics & Advanced Analysis",
    title: "CTEs (Common Table Expressions)",
    description: "Defines temporary named result sets (WITH clause) for modularizing complex multi-step queries.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `WITH high_salary_employees AS (\n  SELECT employee_id, first_name, salary, dept_id \n  FROM employees \n  WHERE salary > 8000\n)\nSELECT h.first_name, d.dept_name \nFROM high_salary_employees h \nJOIN departments d ON h.dept_id = d.dept_id;`,
        columns: ["first_name", "dept_name"],
        rows: [["Alice", "Engineering"]],
        notes: "Single CTE modularizing filtered query before join."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `WITH dept_averages AS (\n  SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id\n),\ndept_headcounts AS (\n  SELECT dept_id, COUNT(*) AS staff_count FROM employees GROUP BY dept_id\n)\nSELECT d.dept_name, a.avg_sal, h.staff_count \nFROM departments d \nJOIN dept_averages a ON d.dept_id = a.dept_id \nJOIN dept_headcounts h ON d.dept_id = h.dept_id;`,
        columns: ["dept_name", "avg_sal", "staff_count"],
        rows: [["Engineering", "8200.00", "12"]],
        notes: "Chaining multiple CTEs in a single WITH statement."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `WITH RECURSIVE emp_hierarchy AS (\n  SELECT employee_id, first_name, manager_id, 1 AS level \n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.employee_id, e.first_name, e.manager_id, h.level + 1 \n  FROM employees e \n  JOIN emp_hierarchy h ON e.manager_id = h.employee_id\n)\nSELECT * FROM emp_hierarchy ORDER BY level;`,
        columns: ["employee_id", "first_name", "manager_id", "level"],
        rows: [
          ["1", "Sarah CEO", "NULL", "1"],
          ["2", "David VP", "1", "2"]
        ],
        notes: "Recursive CTE traversing organizational hierarchy."
      }
    ]
  },
  {
    id: "lag-lead",
    session: "D51",
    category: "Data Analytics & Advanced Analysis",
    title: "LAG() & LEAD() (Growth & Trend Analysis)",
    description: "Accesses previous (LAG) or subsequent (LEAD) row data without requiring self-joins, essential for YoY/MoM growth calculations.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT \n  order_date, \n  total_amount, \n  LAG(total_amount, 1) OVER (ORDER BY order_date) AS prev_amount \nFROM orders;`,
        columns: ["order_date", "total_amount", "prev_amount"],
        rows: [
          ["2026-01-14", "1250.00", "NULL"],
          ["2026-01-15", "340.50", "1250.00"]
        ],
        notes: "LAG fetching immediately preceding order value."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT \n  month, \n  revenue, \n  ROUND(((revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month)) * 100, 2) AS mom_growth_pct \nFROM monthly_revenue;`,
        columns: ["month", "revenue", "mom_growth_pct"],
        rows: [
          ["2026-01", "50000.00", "NULL"],
          ["2026-02", "62000.00", "+24.00"]
        ],
        notes: "Calculating Month-over-Month (MoM) growth percentage."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT \n  customer_id, \n  order_date, \n  LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS next_order_date \nFROM orders;`,
        columns: ["customer_id", "order_date", "next_order_date"],
        rows: [
          ["501", "2026-01-14", "2026-02-10"],
          ["501", "2026-02-10", "NULL"]
        ],
        notes: "LEAD partitioned per customer to analyze repurchase cadence."
      }
    ]
  },
  {
    id: "first-last-value",
    session: "D52",
    category: "Data Analytics & Advanced Analysis",
    title: "FIRST_VALUE(), LAST_VALUE() & NTILE()",
    description: "Returns first or last window value or splits rows into equal bucket quartiles/deciles (NTILE).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT \n  employee_id, \n  dept_id, \n  salary, \n  FIRST_VALUE(salary) OVER (PARTITION BY dept_id ORDER BY salary DESC) AS top_dept_salary \nFROM employees;`,
        columns: ["employee_id", "dept_id", "salary", "top_dept_salary"],
        rows: [["101", "10", "8500.00", "9400.00"]],
        notes: "FIRST_VALUE returning highest salary per department."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT \n  customer_id, \n  total_spent, \n  NTILE(4) OVER (ORDER BY total_spent DESC) AS spend_quartile \nFROM customer_summary;`,
        columns: ["customer_id", "total_spent", "spend_quartile"],
        rows: [
          ["501", "4500.00", "1"],
          ["502", "1200.00", "2"]
        ],
        notes: "Segmenting customers into 4 equal quartiles (1 = VIP, 4 = Low)."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT \n  order_id, \n  order_date, \n  LAST_VALUE(order_id) OVER (PARTITION BY customer_id ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS latest_order \nFROM orders;`,
        columns: ["order_id", "order_date", "latest_order"],
        rows: [["1001", "2026-01-14", "1003"]],
        notes: "LAST_VALUE requiring full frame scope (`UNBOUNDED FOLLOWING`)."
      }
    ]
  },
  {
    id: "rollup-cube",
    session: "D53",
    category: "Data Analytics & Advanced Analysis",
    title: "GROUP BY ROLLUP & CUBE",
    description: "Generates multi-level subtotals and grand totals across hierarchical group dimensions.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT region, category, SUM(sales) AS total_sales \nFROM regional_sales \nGROUP BY ROLLUP(region, category);`,
        columns: ["region", "category", "total_sales"],
        rows: [
          ["North", "Electronics", "15000"],
          ["North", "NULL", "15000"],
          ["NULL", "NULL", "45000"]
        ],
        notes: "ROLLUP generating regional subtotals and grand total."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT year, quarter, SUM(revenue) AS rev \nFROM financial_reports \nGROUP BY ROLLUP(year, quarter);`,
        columns: ["year", "quarter", "rev"],
        rows: [
          ["2026", "Q1", "120000"],
          ["2026", "NULL", "120000"]
        ],
        notes: "Hierarchical time-series ROLLUP subtotals."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT department, role, SUM(budget) \nFROM company_budgets \nGROUP BY CUBE(department, role);`,
        columns: ["department", "role", "SUM(budget)"],
        rows: [["Engineering", "Dev", "80000"]],
        notes: "CUBE calculating all 2^N dimensional combinations."
      }
    ]
  },
  {
    id: "cast-type",
    session: "D54",
    category: "Data Analytics & Advanced Analysis",
    title: "CAST & Type Conversion",
    description: "Explicitly converts expressions from one data type to another (e.g. text to integer or date).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT CAST('2026-09-09' AS DATE) AS date_val, CAST('123.45' AS DECIMAL(10,2)) AS num_val;`,
        columns: ["date_val", "num_val"],
        rows: [["2026-09-09", "123.45"]],
        notes: "Basic explicit string to date/numeric conversion."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT order_id, CAST(total_amount AS INT) AS rounded_amount FROM orders;`,
        columns: ["order_id", "rounded_amount"],
        rows: [["1001", "1250"]],
        notes: "Casting float decimals to integers."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT user_id, CAST(signup_timestamp AS VARCHAR(10)) AS signup_date_str FROM users;`,
        columns: ["user_id", "signup_date_str"],
        rows: [["101", "2026-01-14"]],
        notes: "Converting timestamp to ISO date string."
      }
    ]
  },
  {
    id: "cross-join",
    session: "D55",
    category: "Data Analytics & Advanced Analysis",
    title: "CROSS JOIN (Cartesian Product)",
    description: "Produces a Cartesian product combining every row from the left table with every row from the right table.",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT p.product_name, s.size_code \nFROM products p \nCROSS JOIN sizes s;`,
        columns: ["product_name", "size_code"],
        rows: [
          ["T-Shirt", "S"],
          ["T-Shirt", "M"],
          ["T-Shirt", "L"]
        ],
        notes: "Generating complete product variant matrix."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT d.date_val, p.product_id \nFROM calendar_dates d \nCROSS JOIN products p;`,
        columns: ["date_val", "product_id"],
        rows: [["2026-09-01", "101"]],
        notes: "Generating dense grid for zero-fill daily reporting."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT e.first_name, d.dept_name \nFROM employees e \nCROSS JOIN departments d \nWHERE e.dept_id <> d.dept_id;`,
        columns: ["first_name", "dept_name"],
        rows: [["Alice", "Marketing"]],
        notes: "Filtered CROSS JOIN finding invalid department pairings."
      }
    ]
  },
  {
    id: "full-outer-join",
    session: "D56",
    category: "Data Analytics & Advanced Analysis",
    title: "FULL OUTER JOIN",
    description: "Returns all records when there is a match in left OR right table records (filling NULLs for missing matches on either side).",
    examples: [
      {
        type: "Example 1: Basic Usage",
        sql: `SELECT a.account_id, b.billing_id \nFROM accounts a \nFULL OUTER JOIN billing b ON a.account_id = b.account_id;`,
        columns: ["account_id", "billing_id"],
        rows: [
          ["101", "B-901"],
          ["102", "NULL"],
          ["NULL", "B-905"]
        ],
        notes: "Preserves unmatched rows from both tables."
      },
      {
        type: "Example 2: Common Practical Scenario",
        sql: `SELECT \n  COALESCE(e.emp_id, c.contractor_id) AS id, \n  e.salary, \n  c.hourly_rate \nFROM employees e \nFULL OUTER JOIN contractors c ON e.email = c.email;`,
        columns: ["id", "salary", "hourly_rate"],
        rows: [
          ["101", "8500.00", "NULL"],
          ["901", "NULL", "65.00"]
        ],
        notes: "Reconciling employee and contractor rosters."
      },
      {
        type: "Example 3: Edge Case / Advanced Combination",
        sql: `SELECT * FROM system_a_users a \nFULL OUTER JOIN system_b_users b ON a.user_id = b.user_id \nWHERE a.user_id IS NULL OR b.user_id IS NULL;`,
        columns: ["a_user_id", "b_user_id"],
        rows: [["105", "NULL"]],
        notes: "Symmetric difference query finding discrepancies between systems."
      }
    ]
  }
];

// Combine both dataset parts
const sqlData = [...sqlDataPart1, ...sqlDataPart2];
