
## Challenge_01


#### **Scenario:**

You are tasked with auditing and securing the search functionality of a web application. The application allows users to search for products based on keywords entered into a search field. The current implementation has several security vulnerabilities, and it is your responsibility to identify the insecure code and fix all issues to ensure that the application is secure, efficient, and adheres to best coding practices.

#### **Challenge Requirements:**

1.  **Insecure Code Sample**: The following is the existing search functionality implemented in the web application:

    python

    Sao chép mã

    `from flask import request
    import sqlite3

    # Database connection
    def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

    # Search function
    def search_products():
    query = request.args.get('query')

        # SQL query without any protection
        sql = f"SELECT * FROM products WHERE name LIKE '%{query}%'"

        # Execute query and fetch results
        conn = get_db_connection()
        results = conn.execute(sql).fetchall()
        conn.close()

        return results` 

2.  **Objective:**

    -   **Identify the vulnerabilities** in the above code.
    -   **Fix all security issues** and rewrite the code to follow best practices for secure and defensive coding.

#### **Hints:**

-   **SQL Injection**: The current code is vulnerable to **SQL injection** attacks because user input is directly concatenated into the SQL query. This could allow attackers to execute arbitrary SQL commands by manipulating the `query` parameter.
-   **Input Validation**: There is no **input validation** or sanitization in the current code, which could allow unexpected or malicious data to be processed.
-   **Database Connections**: Ensure proper handling of **database connections** to avoid connection leaks.
-   **Error Handling**: Add proper **error handling** to prevent information disclosure in case of an exception.

#### **Steps to Complete:**

1.  **Identify and explain all the security vulnerabilities** present in the code.
2.  **Refactor the code** to fix the issues. Specifically:
    -   Use **parameterized queries** to prevent SQL injection.
    -   Add **input validation** to ensure the user-supplied query is safe and well-formed.
    -   Implement proper **error handling** to avoid leaking sensitive information.
    -   Ensure proper management of the **database connection**.
3.  **Provide a detailed explanation** of each fix, why it is important, and how it improves the security of the application.

#### **Expected Solution:**

Below is an example of how you might refactor the code to address these security concerns.