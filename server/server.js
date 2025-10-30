const express = require('express');
const cors = require('cors');
const models = require('./models');

const app = express();
app.use(express.json());
app.use(cors());

models.Contact.createTable();

app.get('/contacts', (req, res) => {
    models.Contact.getAll((err, contacts) => {
        if (err) {
            res.status(500).json({ message: "Error retrieving contacts" });
        } else {
            res.json({ contacts: contacts.map(contact => contact.toJson()) });
        }
    });
});

app.post('/create_contact', (req, res) => {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    models.Contact.create(first_name, last_name, email, (err, contact) => {
        if (err) {
            res.status(500).json({ message: "Error creating contact" });
        }
        res.status(201).json({ 
            message: "User Created!",
            contact
        });
    });
});

app.patch('/update_contact/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;

    models.Contact.update(id, first_name, last_name, email, (err, success) => {
        if (err) {
            res.status(500).json({ message: "Error updating contact" });
        } else if (!success) {
            res.status(404).json({ message: "Contact not found" });
        } else {
            res.status(200).json({ message: "Contact updated successfully" });
        }
    });
});

app.delete('/delete_contact/:id', (req, res) => {
    const { id } = req.params;

    models.Contact.delete(id, (err, success) => {
        if (err) {
            res.status(500).json({ message: "Error deleting contact" });
        } else if (!success) {
            res.status(404).json({ message: "Contact not found" });
        } else {
            res.status(200).json({ message: "Contact deleted successfully" });
        }
    });
});

const PORT = 5000;
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);
