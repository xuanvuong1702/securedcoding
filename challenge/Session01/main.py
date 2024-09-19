import sqlite3
from flask import Flask, request, g, jsonify
import os
import re
DATABASE = './test.db'
app = Flask(__name__)



#input validation
def removeSqlInjection(query):
    query = query.replace(';', '')
    query = query.replace("'", "")
    query = query.replace('"', '')
    query = query.replace('\\', '')
    return query


def search_products(name):
    #query = request.args.get('query')
    # SQL query without any protection
    name = removeSqlInjection(name)

    sql = f"SELECT * FROM products WHERE name LIKE ?"

    # Execute query and fetch results

    conn = get_db()

    #using parameterized query to prevent sql injection
    results = conn.execute(sql, (name,)).fetchall()
    conn.close()
    return results

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        try:
            if not os.path.exists(DATABASE):
                conn = sqlite3.connect(DATABASE)
                conn.execute('''CREATE TABLE products
                                (id INTEGER PRIMARY KEY,
                                name TEXT NOT NULL);''')
                # Insert mock data
                mock_data = [('Product 1',), ('Product 2',), ('Product 3',)]
                conn.executemany('INSERT INTO products (name) VALUES (?)', mock_data)
                conn.commit()
                conn.close()
            db = g._database = sqlite3.connect(DATABASE)
        except sqlite3.Error as e:
            print(f"An error occurred: {e.args[0]}")
    return db


#samle query: http://localhost:5000/Product%201
#
@app.route('/<name>', methods=['GET'])
def home(name):
    product = search_products(name)
    if product is None:
        return jsonify({'error': 'not found'}), 404
    return jsonify(product)


if __name__ == '__main__':
    app.run(debug=True)