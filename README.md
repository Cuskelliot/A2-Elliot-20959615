# README.md

IMPORTANT: Once you've cloned this to your forked repository, ensure that you continuously update this document as you complete each task to demonstrate your ongoing progress.

Please include your shared repository link here: https://github.com/Cuskelliot/A2-Elliot-20959615

Make sure for **your case it is in Private**
## Access Database
1 **Plsql Cheat Sheet:**
You can refer to the PostgreSQL cheat sheet [here](https://www.postgresqltutorial.com/postgresql-cheat-sheet/).

2 **Know the Container ID:**
To find out the container ID, execute the following command:
   ```bash
   docker ps
    9958a3a534c9   testsystem-nginx           "/docker-entrypoint.…"   6 minutes ago   Up 6 minutes   0.0.0.0:80->80/tcp   testsystem-nginx-1
    53121618baa4   testsystem-frontend        "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   3000/tcp             testsystem-frontend-1
    c89e46ac94b0   testsystem-api             "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   5000/tcp             testsystem-api-1
    9f4aea7cf538   postgres:15.3-alpine3.18   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   5432/tcp             testsystem-db-1
   ```
3. Running the application

**docker compose command:**
   ```bash
   docker compose up --build
   ```

4 **Access postgreSQL in the container:**
Once you have the container ID, you can execute the container using the following command:
You will see the example of running the PostgreSQL inside the container.
   ```bash
   docker exec -it testsystem-db-1 psql -U postgres
   choiruzain@MacMarichoy TestSystem % docker exec -it testsystem-db-1 psql -U postgres                                       
   psql (15.3)
   Type "help" for help.
   
   postgres=# \dt
             List of relations
    Schema |   Name   | Type  |  Owner   
   --------+----------+-------+----------
    public | contacts | table | postgres
    public | phones   | table | postgres
   (2 rows)
  
    postgres=# select * from contacts;
    id |  name  |         createdAt         |         updatedAt         
   ----+--------+---------------------------+---------------------------
     1 | Helmut | 2024-08-08 11:57:57.88+00 | 2024-08-08 11:57:57.88+00
    (1 row)
    postgres=# select * from phones;
    id | phone_type |   number    | contactId |         createdAt          |         updatedAt          
   ----+------------+-------------+-----------+----------------------------+----------------------------
     1 | Work       | 081431      |         1 | 2024-08-08 11:59:04.386+00 | 2024-08-08 11:59:04.386+00


postgres=# select * from contacts;
   ```
Replace `container_ID` with the actual ID of the container you want to execute.

## Task 1

1. Change the button label from contact component from "Delete" to "Delete Contact"

```bash
<button className="button red" onClick={doDelete}>
  Delete Contact
</button>
```
2. Change the button label in phone component from "Add" to e.g "Add Choiru’s Phone"
```bash
<button className="button green" type="submit">
  Add {contact.name}'s Phone
</button>
```
3. Change the placeholder text "Name" with input type text into a drop-down menu with 4 categories
```bash
<select onChange={(e) => setName(e.target.value)} value={name}>
  <option value="" disabled selected>
    Select Type
  </option>
  <option value="Work">Work</option>
  <option value="Home">Home</option>
  <option value="Mobile">Mobile</option>
  <option value="Other">Other</option>
</select>
```
4. In the <tr> element of the table, change the label "Name" to "Phone Type"
```bash
<thead>
  <tr>
    <th>Phone type</th>
    <th>Number</th>
    <th></th>
  </tr>
</thead>
```

## Executing API

### Contact API

1. Add contacts API  (POST)
```bash
http post http://localhost/api/contacts
        
HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 11:55:30 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 126
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"7e-5tq0JEMHkhNpYDcVKRmJwQxAZJ0"

{
  "id": 3,
  "name": "elliot",
  "address": "palace lane",
  "updatedAt": "2024-10-15T11:55:30.884Z",
  "createdAt": "2024-10-15T11:55:30.884Z"
}
```
2. Get contacts API  (GET)

```bash
http get http://localhost/api/contacts

HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 11:59:28 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 249
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"f9-MtTxO2gEADTJlJxy6SuCt51v5s4"

{
  "id": 3,
  "name": "elliot",
  "address": "palace lane",
  "createdAt": "2024-10-15T11:55:30.884Z",
  "updatedAt": "2024-10-15T11:55:30.884Z"
},
{
  "id": 4,
  "name": "john",
  "address": "address",
  "createdAt": "2024-10-15T11:58:47.376Z",
  "updatedAt": "2024-10-15T11:58:47.376Z"
}
```
3. delete contacts API (DELETE)

```bash
http delete http://localhost/api/contacts/
        
HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 12:00:34 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 47
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"2f-i0D5Qo4IGfH+OpTTITmyTnSzFvU"

{
  "message": "Contact was deleted successfully!"
}
```
4. Edit contacts API (PUT)

```bash 
http put http://localhost/api/contacts/

HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 33
Content-Type: application/json; charset=utf-8
Date: Fri, 04 Oct 2024 04:28:11 GMT
ETag: W/"21-Alc536hfGIM8IOU9Ws/tt5VJi28"
Server: nginx/1.25.1
X-Powered-By: Express


{
  "message": "Cannot update Contact"
}
```

### Phone API

1. Add phone API  (POST)

```bash
http post http://localhost/api/contacts/3/phones
        
HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 12:01:49 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 139
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"8b-PEFu+IKFLOEnTVUsarOgfFUHYuo"

{
  "id": 1,
  "phone_type": "Work",
  "phone_number": 123,
  "contactId": 3,
  "updatedAt": "2024-10-15T12:01:49.467Z",
  "createdAt": "2024-10-15T12:01:49.467Z"
}
```
2. Get phones API  (GET)

```bash
http get http://localhost/api/contacts/3/phones

HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 12:04:03 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 281
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"119-5DUJFISAnqLSrnJ60lIKpxm2IYM"

{
	"id": 1,
	"phone_type": "Work",
	"phone_number": 123,
	"contactId": 3,
	"createdAt": "2024-10-15T12:01:49.467Z",
	"updatedAt": "2024-10-15T12:01:49.467Z"
},
{
	"id": 2,
	"phone_type": "Home",
	"phone_number": 321,
	"contactId": 3,
	"createdAt": "2024-10-15T12:03:47.440Z",
	"updatedAt": "2024-10-15T12:03:47.440Z"
}
```
3. Delete phones API (DELETE)

```bash
http delete http://localhost/api/contacts/3/phones/2
        
HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 12:04:49 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 45
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"2d-FdOer7L1Hk5YcQlrlpn01BrNJmA"

{
  "message": "Phone was deleted successfully!"
}
```
4. Edit phones API (PUT)

```bash 
http put http://localhost/api/contacts/1/phones/4/

HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 33
Content-Type: application/json; charset=utf-8
Date: Fri, 04 Oct 2024 04:59:14 GMT
ETag: W/"21-Alc536hfGIM8IOU9Ws/tt5VJi28"
Server: nginx/1.25.1
X-Powered-By: Express

{
  "message": "Cannot update Phone"
}
```

### Company API

1. Add company API  (POST)

```bash
http post http://localhost/api/contacts/3/company
        
HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 12:05:40 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 166
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"a6-VMNHRb5Mu931+0vw3FqIjDfgbMo"

{
  "company_id": 1,
  "company_name": "company 1",
  "company_address": "c address",
  "contact_id": 3,
  "updatedAt": "2024-10-15T12:05:40.615Z",
  "createdAt": "2024-10-15T12:05:40.615Z"
}
```
2. Get company API  (GET)

```bash
http get http://localhost/api/contacts/3/company

HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 12:06:45 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 337
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"151-anmltW16EWlJPPFtMcu/4mz2p4s"

{
	"company_id": 1,
	"company_name": "company 1",
	"company_address": "c address",
	"contact_id": 3,
	"createdAt": "2024-10-15T12:05:40.615Z",
	"updatedAt": "2024-10-15T12:05:40.615Z"
},
{
	"company_id": 2,
	"company_name": "company 2",
	"company_address": "c address 2",
	"contact_id": 3,
	"createdAt": "2024-10-15T12:06:29.222Z",
	"updatedAt": "2024-10-15T12:06:29.222Z"
}
```
3. Delete company API (DELETE)

```bash
http delete http://localhost/api/contacts/3/company/2
        
HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 12:07:24 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 47
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"2f-goeWLYgQgcZh1o2QS0V4ovFdEa0"

{
  "message": "Company was deleted successfully!"
}
```

4. Edit company API (PUT)

```bash 
http put http://localhost/api/contacts/3/company/1

HTTP/1.1 200 OK
Server: nginx/1.25.1
Date: Tue, 15 Oct 2024 12:08:24 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 47
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost:3000
Vary: Origin
ETag: W/"2f-tSOkyn1aLnHg00JkjP0hv/QxH7Q"

{
  "message": "Company was updated successfully"
}
```

## Task 3

1. Modify contacts table

```bash
module.exports = (sequelize, Sequelize) => {
	const Contact = sequelize.define("contact", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
		},
		address: {
			type: Sequelize.STRING, 
		},
	});

	return Contact;
};
```

2. Modify phones table

```bash
module.exports = (sequelize, Sequelize) => {
	const Phone = sequelize.define("phone", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		phone_type: {
			type: Sequelize.STRING,
		},
		phone_number: {
			type: Sequelize.INTEGER,
		},
		contactId: {
			type: Sequelize.INTEGER,
			references: {
				model: "contacts",
				key: "id",
			},
		},
	});

	return Phone;
};
```

3. Adjust front end

- Created Company.js, CompanyList.js, NewCompany.js components in a "company" folder

- In App.css (relates to Contact.js)
  ```bash
  .contact {
	  align-items: center; <-deleted->
  }
  .contact > .title {
	  align-items: center; <-deleted->
  }
  .contact > .title > h2 { <-changed->
    margin: 0px; <-deleted->
  }

  <-added->

  .title-element {
	  display: flex;
	  flex-direction: row;
  }
  .title-element {
	  display: flex;
	  align-items: center;
  }
  .title-element p {
	  margin: 0;
  }
  .title-element h3 {
	  margin-right: 10px;
  }
  .contact button {
	  width: 100px;
  }

## Task 4

1. Create a new table named 'companies':

```bash
module.exports = (sequelize, Sequelize) => {
	const Company = sequelize.define("company", {
		company_id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		company_name: {
			type: Sequelize.STRING,
		},
		company_address: {
			type: Sequelize.STRING,
		},
		contact_id: {
			type: Sequelize.INTEGER,
			references: {
				model: "contacts",
				key: "id",
			},
		},
	});

	return Company;
};
```

2. Develop four APIs to manage records in the companies table

```bash
// Create company
exports.create = (req, res) => {
	const company = {
		company_name: req.body.company_name,
		company_address: req.body.company_address,
		contact_id: parseInt(req.params.contactId),
	};

	console.log("company", company);

	Company.create(company)
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "An error occurred",
			});
		});
};

// Get all companies
exports.findAll = (req, res) => {
	Company.findAll({
		where: {
			contact_id: parseInt(req.params.contactId),
		},
	})
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred",
			});
		});
};

// Get one company by id
exports.findOne = (req, res) => {
	Company.findOne({
		where: {
			contactId: req.params.contactId,
			id: req.params.company_id,
		},
	})
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred",
			});
		});
};

// Delete one company by id
exports.delete = (req, res) => {
	Company.destroy({
		where: {
			company_id: req.params.company_id,
			contact_id: req.params.contactId,
		},
	})
		.then((num) => {
			if (num == 1) {
				res.status(200).send({
					message: "Company was deleted successfully!",
				});
			} else {
				res.status(400).send({
					message: "Cannot delete company. Record may not exist",
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete company with id=" + id,
			});
		});
};
```

## Task 5

1. Create a front-end interface to manage the newly created companies table, including functionality for adding, editing, deleting, and updating records.

### Edit company using API

```bash
// Update one company by id
exports.update = (req, res) => {
	const id = req.params.company_id;
	const contactId = req.params.contactId;

	Company.update(req.body, {
		where: { company_id: id, contact_id: contactId },
	})
		.then((num) => {
			if (num == 1) {
				res.status(200).send({
					message: "Company was updated successfully.",
				});
			} else {
				res.status(400).send({
					message: "Cannot update company with id=${id}. Field may be empty",
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating company with id=" + id,
			});
		});
};
```

### Index.js
```bash
/* Create database tables and models */
db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.phones = require("./phone.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize); ////
```

### app.js (api folder)

```bash
require("./routes/contacts.routes")(app);
require("./routes/phones.routes")(app);
require("./routes/stats.routes")(app);
require("./routes/company.routes")(app); ////
```

### Company routes

```bash
module.exports = app => {
  const companies = require("../controllers/company.controller.js");
  var router = require("express").Router();
  router.post("/contacts/:contactId/company", companies.create);
  router.get("/contacts/:contactId/company", companies.findAll);
  router.get("/contacts/:contactId/company/:company_id", companies.findOne);
  router.put("/contacts/:contactId/company/:company_id", companies.update);
  router.delete("/contacts/:contactId/company/:company_id", companies.delete);
  app.use('/api', router);
}
```

### Contact.js

- Created useEffect for company
```bash
useEffect(() => {
  fetch("http://localhost/api/contacts/" + contact.id + "/company")
    .then((response) => response.json())
    .then((data) => setCompanies(data))
    .catch((error) => {
      console.error("Error:", error);
    });
}, []);
```
- Changed return CSS/HTML
```bash
return (
		<div
			key={contact.id}
			className="contact" //added
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
				<button className="button red" onClick={doDelete}>
					Delete Contact
				</button>
			</div>

			<div style={expandStyle}>
				<hr />
				<PhoneList phones={phones} setPhones={setPhones} contact={contact} />
				
        // added company list
        <CompanyList
					companies={companies}
					setCompanies={setCompanies}
					contact={contact}
				/>
			</div>
		</div>
	);
```
