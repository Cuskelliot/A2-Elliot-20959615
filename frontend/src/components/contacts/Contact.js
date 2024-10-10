import { useState, useEffect } from 'react';
import PhoneList from '../phones/PhoneList.js';
import CompanyList from '../companies/CompanyList';

function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/api/contacts/${contact.id}/phones`)
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });

        fetch(`http://localhost/api/contacts/${contact.id}/companies`)
            .then(response => response.json())
            .then(data => setCompany(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [contact.id]);
        
    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();
        
        const response = await fetch(`http://localhost/api/contacts/${contact.id}`, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => {
            return c.id !== contact.id;
        });

        setContacts(newContacts);
    }
    
    return (
    <div key={contact.id} className='contact' onClick={(e) => setExpanded(!expanded)}>
        <div className='title'>
            <h2><b>Contact Summary:</b></h2>
        </div>
        <div className='title'>
            <p><b>Name:</b> {contact.Name}</p>
        </div>
        <div className='title'>
            <p><b>Address:</b> {contact.Address}</p>
        </div>
            <p className="instructionText">
                Click the contact to <b>expand or collapse</b> {contact.Name}'s phone list
            </p>
        <div className='title'>   
            <button className='button red' onClick={doDelete}>Delete Contact</button>
        </div>
                        
        <div style={expandStyle}>
            <hr />
            <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
            <hr />
            <CompanyList company={company} setCompany={setCompany} contact={contact} />
        </div>
    </div>
    );
}

export default Contact;
