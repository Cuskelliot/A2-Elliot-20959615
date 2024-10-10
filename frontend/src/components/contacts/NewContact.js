import { useState } from 'react';

function NewContact(props) {
    const {contacts, setContacts} = props;
    const [name, setName] = useState('');

    const contactAddresses = [
        { name: "Elliot", address: "123 Main St" },
        { name: "John", address: "456 Elm St" },
        { name: "Emily", address: "789 Oak St" },
        { name: "Sarah", address: "101 Pine St" },
      ];

    async function createContact(e) {
        e.preventDefault();
        
        const selectedContact = contactAddresses.find((contact) => contact.name === name);
        const address = selectedContact ? selectedContact.address : "";

        const response = await fetch('http://localhost/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                address
            })
        });

        const data = await response.json();
        if (data.id) {
            setContacts([...contacts, data]);
        }
        setName('');
    }


    return (
        <form className='new-contact' onSubmit={createContact}>
            <select onChange={(e) => setName(e.target.value)} value={name}>
                <option value="" disabled selected>Select name</option>
                <option value="Elliot">Elliot</option>
                <option value="John">John</option>
                <option value="Emily">Emily</option>
                <option value="Sarah">Sarah</option>
            </select>
            <button className='button green' type='submit'>Create Contact</button>
        </form>
    );

}

export default NewContact;