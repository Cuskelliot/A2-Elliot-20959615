function Company(props) {
    const {contact, company, companies, setCompany} = props;

    async function deleteCompany() {
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/companies/' + company.id, {
            method: 'DELETE',
        });

        let newCompany = companies.filter((p) => {
            return p.id !== company.id;
        });

        setCompany(newCompany);
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
