import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../contexts/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const text = useRef();

  const onChange = () => {
    if (text.current.value !== '') {
      filterContacts(text.current.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        onChange={onChange}
        ref={text}
        type="text"
        placeholder="Filter contacts..."
      />
    </form>
  );
};

export default ContactFilter;
