import React from 'react';
import { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import { NameList } from './NameList/NameList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('MOUNT');
    const contactData = localStorage.getItem('contacts');
    const parsedData = JSON.parse(contactData);
if (parsedData) {
  setContacts(parsedData);

}
  }, []);

  useEffect(() => {
    console.log('UPDATE');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInputChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const onSubmitMoveDataToApp = evt => {
    const contact = {
      id: nanoid(),
      name: evt.name,
      number: evt.number,
    };

    console.log(contact);
    console.log(contacts);

    if (contacts.map(item => item.name).includes(evt.name))
      return alert(`${evt.name} is already in contacts`);

    setContacts(prevState => [...prevState, contact]);
  };

  const onDeleteContact = evt => {
    const contactToDeleteID = evt.currentTarget.name;

    setContacts(contacts.filter(item => item.id !== contactToDeleteID));
  };

 

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <Form moveData={onSubmitMoveDataToApp} />
      <Filter inputText={filter} onInput={handleInputChange} />
      <NameList contacts={visibleContacts} deleteContact={onDeleteContact} />
    </>
  );
}
