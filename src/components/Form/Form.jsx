import style from './Form.module.css';
import React from 'react';
import { useState } from 'react';

export const Form = props => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { moveData } = props;

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    // console.log(evt.currentTarget.name);
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    // console.log('handleSubmit', this.state);
    moveData({ name, number });
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label> Name{}</label>
      <input
        className={style.input}
        onChange={handleInputChange}
        value={name}
        type="text"
        name="name"
        placeholder="Boris Johnsoniuk"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label> Number{}</label>
      <input
        className={style.input}
        onChange={handleInputChange}
        value={number}
        type="tel"
        name="number"
        placeholder="+123456789"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit">Add Contact</button>
    </form>
  );
};
