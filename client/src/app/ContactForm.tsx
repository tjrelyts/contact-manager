import React, { useState } from 'react';
import { Contact } from './types';

type ContactFormProps = {
    existingContact?: Contact;
    updateCallback: () => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ existingContact, updateCallback }) => {
    const [firstName, setFirstName] = useState(existingContact?.firstName ||'');
    const [lastName, setLastName] = useState(existingContact?.lastName || '');
    const [email, setEmail] = useState(existingContact?.email ||'');

    const updating = !!existingContact;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email
        }
        const url = "http://localhost:5000/" + (updating ? `update_contact/${existingContact?.id}` : "create_contact");
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options);
        if (response.status !== 201 && response.status !== 200) {
            const message = await response.json();
            alert(message.message);
        } else {
            updateCallback();
        }
    }

    return <form onSubmit={onSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow-md space-y-4">
        <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1 font-medium">First Name:</label>
            <input 
                type="text" 
                id="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-50" 
            />
        </div>
        <div className="flex flex-col"> 
            <label htmlFor="lastName" className="mb-1 font-medium">Last Name:</label>
            <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-50"
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-50"
            />
        </div>
        <button type="submit" className="w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">{updating ? "Update" : "Create" }</button>
    </form>
};

export default ContactForm;