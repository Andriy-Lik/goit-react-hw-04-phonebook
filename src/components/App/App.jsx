import React from "react";
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import initialContacts from '../Data/Contacts.json';

import Section from '../Section';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Message from '../Message';
import { Title, Span } from './App.styled';

const getInitialContacts = () => {
  const contacts = localStorage.getItem('contacts');
  
  if (contacts !== null) {
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } else {
    return initialContacts;
  }
}

const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  const addContact = data => {
    if (contacts.some(({ name }) => name.toLowerCase() === data.name.toLowerCase())) {
      Report.failure(`${data.name} is already in contacts`)
    }

    else {
      setContacts(prevState => [...prevState, 
          { id: nanoid(), name: data.name, number: data.number, }
        ],
      );
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <Section title='Phonebook'>
        <Title><Span>P</Span>honebook</Title>
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title='Contacts'>
        <Title>Contact<Span>s</Span></Title>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length > 0 ? 
          (<ContactList contacts={getVisibleContact()} onDelete={deleteContact} />) :
          (<Message text="PhoneBook is empty!!!" />)
        }
      </Section>
    </>
  );
}

export default App;