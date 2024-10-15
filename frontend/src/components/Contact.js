import { useState, useEffect } from "react"; // import useEffect
import PhoneList from "./PhoneList.js";
import CompanyList from "./company/CompanyList.js";

function Contact(props) {
	const { contact, contacts, setContacts } = props;
	const [expanded, setExpanded] = useState(false);
	const [phones, setPhones] = useState([]);
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		fetch("http://localhost/api/contacts/" + contact.id + "/phones")
			.then((response) => response.json())
			.then((data) => setPhones(data))
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	// company use effect
	useEffect(() => {
		fetch("http://localhost/api/contacts/" + contact.id + "/company")
			.then((response) => response.json())
			.then((data) => setCompanies(data))
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	const expandStyle = {
		display: expanded ? "block" : "none",
	};

	async function doDelete(e) {
		e.stopPropagation();

		const response = await fetch(
			"http://localhost/api/contacts/" + contact.id,
			{
				method: "DELETE",
			},
		);

		let newContacts = contacts.filter((c) => {
			return c.id !== contact.id;
		});

		setContacts(newContacts);
	}

	return (
		<div
			key={contact.id}
			className="contact"
			onClick={(e) => setExpanded(!expanded)}
		>
			<div className="title">
				<h2>Contact Summary:</h2>
				<div className="title-element">
					<h3>Name:</h3> <p>{contact.name}</p>
				</div>
				<div className="title-element">
					<h3>Address:</h3> <p>{contact.address}</p>
				</div>
				<i className="italic">
					Click the contact to expand or collapse {contact.name}'s phone list
				</i>
				<button className="button red" onClick={doDelete}>
					Delete Contact
				</button>
			</div>

			<div style={expandStyle}>
				<hr />
				<PhoneList phones={phones} setPhones={setPhones} contact={contact} />
				<CompanyList
					companies={companies}
					setCompanies={setCompanies}
					contact={contact}
				/>
			</div>
		</div>
	);
}

export default Contact;
