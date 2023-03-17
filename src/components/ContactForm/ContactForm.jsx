import React from "react";
import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { nanoid } from "nanoid";
import { Form, FormLabel, FormInput, FormButton } from './ContactForm.styled';

const ContactForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameInpudId = nanoid();
    const numberInpudId = nanoid();

    const handleChange = e => {
        switch (e.target.name) {
            case 'name': setName(e.target.value);
            break;

            case 'number': setNumber(e.target.value);
            break;

            default: return;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ name, number });
        // Reset
        setName('');
        setNumber('');
    };

    return (
        <Form onSubmit={handleSubmit} >
            <FormLabel htmlFor={nameInpudId}>Name</FormLabel>
            <FormInput
                type="text"
                name="name"
                id={nameInpudId}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value={name}
                onChange={handleChange}
            />

            <FormLabel htmlFor={numberInpudId}>Number</FormLabel>
            <FormInput
                    type="tel"
                    name="number"
                    id={numberInpudId}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={handleChange}
            />
            <FormButton type="submit">Add contact</FormButton>
        </Form>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default ContactForm;