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
                </tr>
            </thead>
            <tbody>
            {company.map((co, index) => {
                return <Company key={index} company={co} companies={company} setCompany={setCompany} contact={contact} />;
            })}
            </tbody>
        </table>
    </div>
    );
}

export default CompanyList;