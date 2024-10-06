// import { useState, useEffect } from 'react';
// import PhoneList from '../phones/PhoneList.js';
// import CompanyList from '../companies/CompanyList.js';

// function Contact(props) {
//     const { contact, contacts, setContacts } = props;
//     const [expanded, setExpanded] = useState(false);
//     const [phones, setPhones] = useState([]);
//     const [company, setCompany] = useState([]);

//     useEffect(() => {
//         const fetchPhones = async () => {
//             try {
//                 const response = await fetch(`http://localhost/api/contacts/${contact.id}/phones`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setPhones(data);
//             } catch (error) {
//                 console.error('Error fetching phones:', error);
//             }
//         };

//         fetchPhones();
//     }, [contact.id]);

//     const expandStyle = {
//         display: expanded ? 'block' : 'none'
//     };

//     const doDelete = async (e) => {
//         e.stopPropagation();
        
//         try {
//             const response = await fetch(`http://localhost/api/contacts/${contact.id}`, {
//                 method: 'DELETE',
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to delete contact: ${response.statusText}`);
//             }

//             const newContacts = contacts.filter((c) => c.id !== contact.id);
//             setContacts(newContacts);
//         } catch (error) {
//             console.error('Error deleting contact:', error);
//         }
//     };

//     return (
//         <div key={contact.id} className='contact' onClick={() => setExpanded(!expanded)}>
//             <div className='title'>
//                 <h3>{contact.name}</h3>
//                 <button className='button red' onClick={doDelete}>Delete Contact</button>
//             </div>

//             <div style={expandStyle}>
//                 <hr />
//                 <p>ID: {contact.id}</p>
//                 <p>Name: {contact.name}</p>
//                 <p>Address: {contact.address}</p>
//                 <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
//             </div>
//         </div>
//     );
// }

// export default Contact;

import { useState, useEffect } from 'react';
import PhoneList from '../phones/PhoneList.js';
import CompanyList from '../companies/CompanyList.js'; // Import CompanyList

function Contact(props) {
    const { contact, contacts, setContacts } = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);
    const [company, setCompany] = useState([]); // State for companies
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

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

        const fetchCompany = async () => {
            try {
                const response = await fetch(`http://localhost/api/contacts/${contact.id}/company`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCompany(data);
            } catch (error) {
                console.error('Error fetching company:', error);
            }
        };

        fetchPhones();
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

    const addCompany = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost/api/contacts/${contact.id}/company`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company_name: companyName,
                    company_address: companyAddress,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to add company: ${response.statusText}`);
            }

            const newCompany = await response.json();
            setCompany([...company, newCompany]);

            setCompanyName('');
            setCompanyAddress('');
        } catch (error) {
            console.error('Error adding company:', error);
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

                <hr />
                <h4>Add Company</h4>
                <form onSubmit={addCompany}>
                    <div>
                        <label>Company Name:</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Company Address:</label>
                        <input
                            type="text"
                            value={companyAddress}
                            onChange={(e) => setCompanyAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Add Company</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;