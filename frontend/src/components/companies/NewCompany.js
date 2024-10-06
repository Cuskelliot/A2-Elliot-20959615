import { useState } from 'react';

function NewCompany(props) {
    const {contact, company, setCompany} = props;
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');

    async function createCompany(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost/api/contacts/${contact.id}/company`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                address,
            })
        });

        const data = await response.json();

        if (data.id) {
            setCompany([...company, data]);
        }

        setName('');
        setAddress('');
    }

	return (
        <form onSubmit={createCompany} onClick={(e) => e.stopPropagation()} className='new-company'>
            <input type='text' placeholder='Company name' onChange={(e) => setName(e.target.value)} value={name}/>
            <input type='text' placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address}/>
            <button className='button green' type='submit'>Add New Company</button>
        </form>
	);
}

export default NewCompany;