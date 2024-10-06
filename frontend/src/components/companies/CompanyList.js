import Company from './Company.js';
import NewCompany from './NewCompany.js';

function CompanyList(props) {
    const {contact, company, setCompany} = props;

	return (
        <div className='company-list'>
            <NewCompany company={company} setCompany={setCompany} contact={contact} />

            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Company name</th> 
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        company.map((co) => {
                            return (
                                <Company key={co.id} company={co} companies={companies} setCompany={setCompany} contact={contact} />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
	);
}

export default CompanyList;
