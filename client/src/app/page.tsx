"use client";

import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import { Contact } from './types';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | undefined>(undefined);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://localhost:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
    console.log(data.contacts);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact(undefined);
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  }

  const openEditModal = (contact: Contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  }

  return <><ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
    <button onClick={openCreateModal} className="m-5 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition-colors">Create New Contact</button>
    {isModalOpen && <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-500 rounded-xl p-8 w-full max-w-lg relative shadow-2xl">
          <span onClick={closeModal} className="absolute top-1 right-2 text-black hover:text-gray-700 text-3xl font-bold transition-colors">&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
        </div>
      </div>}
      </>;
}
