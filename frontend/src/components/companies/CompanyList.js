import { useState, useEffect } from 'react';
import Company from './Company.js';
import NewCompany from './NewCompany.js';

function CompanyList(props) {
    const {contact, company, setCompany} = props;

    const fetchCompany = () => {
        fetch(`http://localhost/api/contacts/${contact.id}/company`)
            .then(response => response.json())
            .then(data => setCompany(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        fetchCompany();
    }, [contact.id]);


      return (
        <div className='company-list'>
            <NewCompany company={company} setCompany={setCompany} contact={contact} />

            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Update or Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        company.map((co) => {
                            return (
                                <Company key={co.company_id} co={co} company={company} 
                                setCompany={setCompany} contact={contact} refreshCompany={fetchCompany} />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
      );
}

export default CompanyList;