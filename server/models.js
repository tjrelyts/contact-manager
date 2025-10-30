const db = require('./db_config');

class Contact { 
    constructor(id, first_name, last_name, email) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
    }

    static createTable() {
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )`, (err) => {
            if (err) {
                console.error("Error creating contacts table: " + err);
            } else {
                console.log("Contacts table created or already exists.");
            }
        });
    }

    static create(first_name, last_name, email, callback) {
        const query = `INSERT INTO contacts (first_name, last_name, email) VALUES (?, ?, ?)`;
        db.run(query, [first_name, last_name, email], function(err) {
            if (err) {
                console.error("Error inserting contact: " + err);
                callback(err);
            } else {
                callback(null, new Contact(this.lastID, first_name, last_name, email));
            }
        });
    }

    static delete(id, callback) {
        const query = `DELETE FROM contacts WHERE id = ?`;
        db.run(query, [id], function(err) {
            if (err) {
                console.error("Error deleting contact: " + err);
                callback(err);
            } else {
                callback(null, this.changes);
            }
        });
    }

    static update(id, first_name, last_name, email, callback) {
        const query = `UPDATE contacts SET first_name = ?, last_name = ?, email = ? WHERE id = ?`;
        db.run(query, [first_name, last_name, email, id], function(err) {
            if (err) {
                console.error("Error updating contact: " + err);
                callback(err);
            } else {
                callback(null, this.changes);
            }
        });
    }

    static getAll(callback) {
        const query = `SELECT * FROM contacts`;
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error("Error fetching contacts: " + err);
                callback(err, null);
            } else {
                const contacts = rows.map(row => new Contact(row.id, row.first_name, row.last_name, row.email));
                callback(null, contacts);
            }
        });
    }

    toJson() {
        return {
            "id": this.id,
            "firstName": this.first_name,
            "lastName": this.last_name,
            "email": this.email
        };
    }
}

module.exports = {
    Contact
};