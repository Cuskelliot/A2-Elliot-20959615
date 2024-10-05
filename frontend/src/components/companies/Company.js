function Company(props) {
    const {contact, company, companies, setCompany} = props;

    async function deleteCompany() {
        try {
            const response = await fetch(`http://localhost/api/contacts/${contact.id}/company/${company.id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            let newCompany = companies.filter((c) => {
                return c.id !== company.id;
            });
    
            setCompany(newCompany);
        } catch (error) {
            console.error('Failed to delete company:', error);
        }
    }

	return (
		<tr>
            <td>{ company.company_name }</td>
            <td>{ company.company_address }</td>
            <td style={
                {
                    width: '14px',
                }
            }><button className="button red" onClick={deleteCompany}>Delete</button></td>
        </tr>
	);
}

export default Company;
