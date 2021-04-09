import React, { useContext } from 'react';
import ContactContext from '../../contexts/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;

  return contacts.map((contact) => (
    <ContactItem key={contact.id} contact={contact} />
  ));
};

export default Contacts;
