import { useState, useEffect } from 'react';
import Phone from './Phone.js';
import NewPhone from './NewPhone.js';

function PhoneList(props) {
    const {contact, phones, setPhones} = props;

    const fetchPhones = () => {
        fetch(`http://localhost/api/contacts/${contact.id}/phones`)
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        fetchPhones();
    }, [contact.id]);

      return (
        <div className='phone-list'>
            <NewPhone phones={phones} setPhones={setPhones} contact={contact} />

            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Phone Type</th>
                        <th>Phone Number</th>
                        <th>Modification Update or Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        phones.map((phone) => {
                            return (
                                <Phone key={phone.id} phone={phone} phones={phones} setPhones={setPhones} contact={contact} refreshPhones={fetchPhones}/>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
      );
}

export default PhoneList;
