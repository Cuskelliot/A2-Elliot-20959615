import { useState, useEffect } from 'react';
import PhoneList from '../phones/PhoneList.js';
import CompanyList from '../companies/CompanyList.js';

function Contact(props) {
    const { contact, contacts, setContacts } = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        const fetchPhones = async () => {
            try {
                const response = await fetch(`http://localhost/api/contacts/${contact.id}/phones`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPhones(data);
            } catch (error) {
                console.error('Error fetching phones:', error);
            }
        };

        fetchPhones();
    }, [contact.id]);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetch(`http://localhost/api/contacts/${contact.id}/company`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCompany(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Error fetching company:', error);
            }
        };

        fetchCompany();
    }, [contact.id]);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    const doDelete = async (e) => {
        e.stopPropagation();
        
        try {
            const response = await fetch(`http://localhost/api/contacts/${contact.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete contact: ${response.statusText}`);
            }

            const newContacts = contacts.filter((c) => c.id !== contact.id);
            setContacts(newContacts);
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <div key={contact.id} className='contact' onClick={() => setExpanded(!expanded)}>
            <div className='title'>
                <h3>{contact.name}</h3>
                <button className='button red' onClick={doDelete}>Delete Contact</button>
            </div>

            <div style={expandStyle}>
                <hr />
                <p>ID: {contact.id}</p>
                <p>Name: {contact.name}</p>
                <p>Address: {contact.address}</p>
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
                <CompanyList company={company} setCompany={setCompany} contact={contact} />
            </div>
        </div>
    );
}

export default Contact;