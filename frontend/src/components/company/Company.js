import { useState, useEffect } from "react";
function Company(props) {
	const { contact, company, setCompanies, companies } = props;
	const [inEditMode, setInEditMode] = useState(false);
	const [newName, setNewName] = useState(company.company_name);
	const [newAddress, setNewAddress] = useState(company.company_address);

	async function updateCompany() {
		try {
			const response = await fetch(
				`http://localhost/api/contacts/${contact.id}/company/${company.company_id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						company_name: newName,
						company_address: newAddress,
					}),
				},
			);

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
		} catch (error) {
			console.error("Failed to delete company:", error);
		}
	}

	async function deleteCompany() {
		const response = await fetch(
			"http://localhost/api/contacts/" +
				contact.id +
				"/company/" +
				company.company_id,
			{
				method: "DELETE",
			},
		);

		let newCompanies = companies.filter((p) => {
			return p.company_id !== company.company_id;
		});

		setCompanies(newCompanies);
	}

	if (inEditMode) {
		return (
			<tr>
				<td>
					<input
						type="text"
						value={newName}
						onChange={(e) => {
							setNewName(e.target.value);
						}}
					/>
				</td>
				<td>
					<input
						type="text"
						value={newAddress}
						onChange={(e) => {
							setNewAddress(e.target.value);
						}}
					/>
				</td>
				<td>
					<button
						className="button green"
						onClick={(e) => {
							e.preventDefault();
							setInEditMode(false);
							updateCompany();
						}}
					>
						Save
					</button>
					<button className="button red" onClick={() => setInEditMode(false)}>
						Cancel
					</button>
				</td>
			</tr>
		);
	}
	return (
		<tr>
			<td onClick={() => setInEditMode(true)}>{newName}</td>
			<td onClick={() => setInEditMode(true)}>{newAddress}</td>
			<td
				style={{
					width: "14px",
				}}
			>
				<button
					className="button red"
					onClick={(e) => {
						e.preventDefault();
						deleteCompany();
					}}
				>
					Delete
				</button>
			</td>
		</tr>
	);
}

export default Company;
