import React from 'react';
import { Contact } from './types';

type ContactListProps = {
    contacts: Contact[];
    updateContact: (contact: Contact) => void;
    updateCallback: () => void;
};

const ContactList: React.FC<ContactListProps> = ({ contacts, updateContact, updateCallback }) => {
    const deleteContact = async (id: number) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://localhost:5000/delete_contact/${id}`, options);
            if (response.status === 200) {
                updateCallback();
            } else {
                console.error("Failed to delete contact.");
            }
        } catch (error) {
            alert(error);
        }
    }

    return <div>
        <h2 className="text-2xl font-bold mb-4">Contact List</h2>
        <table>
            <thead>
                <tr>
                    <th className="px-4 py-2 text-left border-b">First Name</th>
                    <th className="px-4 py-2 text-left border-b">Last Name</th>
                    <th className="px-4 py-2 text-left border-b">Email</th>
                    <th className="px-4 py-2 text-left border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td className="px-4 py-2 border-b">{contact.firstName}</td>
                        <td className="px-4 py-2 border-b">{contact.lastName}</td>
                        <td className="px-4 py-2 border-b">{contact.email}</td>
                        <td className="px-4 py-2 border-b">
                            <button onClick={() => updateContact(contact)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
                            <button onClick={() => deleteContact(contact.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ContactList;