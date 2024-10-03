function Phone(props) {
    const {contact, phone, phones, setPhones} = props;

    async function deletePhone() {
        try {
            const response = await fetch(`http://localhost/api/contacts/${contact.id}/phones/${phone.id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            let newPhones = phones.filter((p) => {
                return p.id !== phone.id;
            });
    
            setPhones(newPhones);
        } catch (error) {
            console.error('Failed to delete phone:', error);
        }
    }

	return (
		<tr>
            <td>{ phone.phone_type }</td>
            <td>{ phone.phone_number }</td>
            <td style={
                {
                    width: '14px',
                }
            }><button className="button red" onClick={deletePhone}>Delete</button></td>
        </tr>
	);
}

export default Phone;
