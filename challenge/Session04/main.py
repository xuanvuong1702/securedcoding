import sqlite3
from flask import Flask, request, g, jsonify
import os
import re
DATABASE = './test.db'
app = Flask(__name__)

def  get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def table_exists(conn, table_name):
    cursor = conn.cursor()
    cursor.execute(f'''SELECT count(name) FROM sqlite_master WHERE type='table' AND name='{table_name}';''')
    return cursor.fetchone()[0] == 1

def init_db():
    conn = sqlite3.connect(DATABASE)
    if not table_exists(conn, 'users'):
        conn.execute('''CREATE TABLE users
                        (id INTEGER PRIMARY KEY,
                        name TEXT NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        phone TEXT UNIQUE NOT NULL,
                        active INTEGER NOT NULL DEFAULT 1);''')
        mock_data = [('John Doe', 'john@example.com', '1234567890', 1), ('Jane Doe', 'jane@example.com', '0987654321', 1)]
        conn.executemany('INSERT INTO users (name, email, phone, active) VALUES (?, ?, ?, ?)', mock_data)

    if not table_exists(conn, 'roles'):
        conn.execute('''CREATE TABLE roles
                        (id INTEGER PRIMARY KEY,
                        name TEXT UNIQUE NOT NULL);''')
        mock_data = [('Admin',), ('User',)]
        conn.executemany('INSERT INTO roles (name) VALUES (?)', mock_data)

    if not table_exists(conn, 'user_roles'):
        conn.execute('''CREATE TABLE user_roles
                        (user_id INTEGER,
                        role_id INTEGER,
                        PRIMARY KEY (user_id, role_id),
                        FOREIGN KEY (user_id) REFERENCES users (id),
                        FOREIGN KEY (role_id) REFERENCES roles (id));''')
        mock_data = [(1, 1), (1, 2), (2, 2)]
        conn.executemany('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', mock_data)

    if not table_exists(conn, 'permissions'):
        conn.execute('''CREATE TABLE permissions
                        (id INTEGER PRIMARY KEY,
                        name TEXT UNIQUE NOT NULL);''')
        mock_data = [('Create',), ('Read',), ('Update',), ('Delete',)]
        conn.executemany('INSERT INTO permissions (name) VALUES (?)', mock_data)

    if not table_exists(conn, 'role_permissions'):
        conn.execute('''CREATE TABLE role_permissions
                        (role_id INTEGER,
                        permission_id INTEGER,
                        PRIMARY KEY (role_id, permission_id),
                        FOREIGN KEY (role_id) REFERENCES roles (id),
                        FOREIGN KEY (permission_id) REFERENCES permissions (id));''')
        mock_data = [(1, 1), (1, 2), (1, 3), (1, 4)]
        conn.executemany('INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)', mock_data)

    conn.commit()
    conn.close()


@app.route('/user', methods=['POST'])
def create_user():
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    try:
        cursor.execute("INSERT INTO users (name, email, phone, active) VALUES (?, ?, ?, ?)",
                       (data['name'], data['email'], data['phone'], data['active']))
        db.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'User with this email or phone already exists'}), 400

@app.route('/user/<int:user_id>', methods=['GET'])
def read_user(user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
    user = cursor.fetchone()
    if user:
        return jsonify({'user': user}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    cursor.execute("UPDATE users SET name=?, email=?, phone=?, active=? WHERE id=?",
                   (data['name'], data['email'], data['phone'], data['active'], user_id))
    if cursor.rowcount > 0:
        db.commit()
        return jsonify({'message': 'User updated successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404


@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM users WHERE id=?", (user_id,))
    if cursor.rowcount > 0:
        db.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404



@app.route('/role', methods=['POST'])
def create_role():
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    try:
        cursor.execute("INSERT INTO roles (name) VALUES (?)", (data['name'],))
        db.commit()
        return jsonify({'message': 'Role created successfully'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Role with this name already exists'}), 400

@app.route('/role/<int:role_id>', methods=['GET'])
def read_role(role_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM roles WHERE id=?", (role_id,))
    role = cursor.fetchone()
    if role:
        return jsonify({'role': role}), 200
    else:
        return jsonify({'message': 'Role not found'}), 404

@app.route('/role/<int:role_id>', methods=['PUT'])
def update_role(role_id):
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    cursor.execute("UPDATE roles SET name=? WHERE id=?", (data['name'], role_id))
    if cursor.rowcount > 0:
        db.commit()
        return jsonify({'message': 'Role updated successfully'}), 200
    else:
        return jsonify({'message': 'Role not found'}), 404

@app.route('/role/<int:role_id>', methods=['DELETE'])
def delete_role(role_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM roles WHERE id=?", (role_id,))
    if cursor.rowcount > 0:
        db.commit()
        return jsonify({'message': 'Role deleted successfully'}), 200
    else:
        return jsonify({'message': 'Role not found'}), 404


@app.route('/role_matrix', methods=['GET'])
def get_role_matrix():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''SELECT roles.name, permissions.name 
                      FROM roles 
                      JOIN role_permissions ON roles.id = role_permissions.role_id 
                      JOIN permissions ON role_permissions.permission_id = permissions.id''')
    role_matrix = cursor.fetchall()
    if role_matrix:
        return jsonify({'role_matrix': role_matrix}), 200
    else:
        return jsonify({'message': 'Role matrix not found'}), 404

if __name__ == '__main__':
    init_db()
    app.run(debug=True)