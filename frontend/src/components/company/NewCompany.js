import { useState } from "react";

function NewCompany(props) {
	const { contact, companies, setCompanies } = props;
	const [companyName, setCompanyName] = useState("");
	const [companyAddess, setCompanyAddress] = useState("");

	async function createCompany(e) {
		e.preventDefault();

		const response = await fetch(
			`http://localhost/api/contacts/${contact.id}/company`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					company_name: companyName,
					company_address: companyAddess,
				}),
			},
		);

		const data = await response.json();

		if (data.company_id) {
			setCompanies([...companies, data]);
		}

		setCompanyName("");
		setCompanyAddress("");
	}

	return (
		<form
			onSubmit={createCompany}
			onClick={(e) => e.stopPropagation()}
			className="new-phone"
		>
			<input
				type="text"
				placeholder="Company Name"
				onChange={(e) => setCompanyName(e.target.value)}
				value={companyName}
			/>
			<input
				type="text"
				placeholder="Company Address"
				onChange={(e) => setCompanyAddress(e.target.value)}
				value={companyAddess}
			/>
			<button className="button green" type="submit">
				Add {contact.name}'s Company
			</button>
		</form>
	);
}

export default NewCompany;
