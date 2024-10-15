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

```
<button className="button red" onClick={doDelete}>
  Delete Contact
</button>
```

2. Change the button label in phone component from "Add" to e.g "Add Choiru’s Phone"

```
<button className="button green" type="submit">
  Add {contact.name}'s Phone
</button>
```

3. Change the placeholder text "Name" with input type text into a drop-down menu with 4 categories

```
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

```
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
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 119
Content-Type: application/json; charset=utf-8
Date: Fri, 04 Oct 2024 04:08:30 GMT
ETag: W/"77-aafdNDgf06FiHD9zLdYYWPjH9uI"
Server: nginx/1.25.1
X-Powered-By: Express

{
   "id": 1,
   "name": "Elliot",
   "createdAt": "2024-10-04T04:08:13.804Z",
   "updatedAt": "2024-10-04T04:08:13.804Z"
}

```
2. Get contacts API  (GET)

```bash
http get http://localhost/api/contacts

HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 235
Content-Type: application/json; charset=utf-8
Date: Fri, 04 Oct 2024 04:20:29 GMT
ETag: W/"eb-6OEA1yqHJc7MVfyYBrzIh7pa5Kk"
Server: nginx/1.25.1
X-Powered-By: Express

{
    "id": 1,
    "name": "Elliot",
    "address": null,
    "createdAt": "2024-10-04T04:08:13.804Z",
    "updatedAt": "2024-10-04T04:08:13.804Z"
  },
  {
    "id": 2,
    "name": "John",
    "address": null,
    "createdAt": "2024-10-04T04:20:07.891Z",
    "updatedAt": "2024-10-04T04:20:07.891Z"
  }


```
3. delete contacts API (DELETE)

```bash

http delete http://localhost/api/contacts/
        
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 47
Content-Type: application/json; charset=utf-8
Date: Fri, 04 Oct 2024 04:28:11 GMT
ETag: W/"2f-i0D5Qo4IGfH+OpTTITmyTnSzFvU"
Server: nginx/1.25.1
X-Powered-By: Express

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
http post http://localhost/api/contacts/1/phones
        
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 149
Content-Type: application/json; charset=utf-8
Date: Fri, 04 Oct 2024 04:53:59 GMT
ETag: W/"95-tO8NL26kF7ArGevUCVl52Tz7ZrY"
Server: nginx/1.25.1
X-Powered-By: Express

{
   "id": 4,
   "phone_type": "mobile",
   "phone_number": 234234234,
   "contactId": 1,
   "createdAt": "2024-10-04T04:50:05.985Z",
   "updatedAt": "2024-10-04T04:50:05.985Z"
}


```
2. Get phones API  (GET)

```bash
http get http://localhost/api/contacts/1/phones

HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 161
Content-Type: application/json; charset=utf-8
Date: Fri, 04 Oct 2024 04:45:45 GMT
ETag: W/"a1-yn0lgKQCzpii+7dho5kE7MA6gBA"
Server: nginx/1.25.1
X-Powered-By: Express

{
   "id": 4,
   "phone_type": "mobile",
   "phone_number": 432748234,
   "contactId": 1,
   "createdAt": "2024-10-04T04:14:41.564Z",
   "updatedAt": "2024-10-04T04:14:41.564Z"
}
```
3. Delete phones API (DELETE)

```bash
http delete http://localhost/api/contacts/2/phones/5/
        
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 45
Content-Type: application/json; charset=utf-8
Date: Fri, 04 Oct 2024 04:57:34 GMT
ETag: W/"2d-FdOer7L1Hk5YcQlrlpn01BrNJmA"
Server: nginx/1.25.1
X-Powered-By: Express

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
http post http://localhost/api/contacts/1/company
        
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 151
Content-Type: application/json; charset=utf-8
Date: Thu, 10 Oct 2024 09:24:00 GMT
ETag: W/"97-WcuWehUDhCnEzEaTsCXkswQ9yq4"
Server: nginx/1.25.1
X-Powered-By: Express

{
  "company_id": 2,
  "company_name": "sdfsdf",
  "contactId": 1,
  "updatedAt": "2024-10-10T09:24:00.374Z",
  "createdAt": "2024-10-10T09:24:00.374Z",
  "company_address": "333"
}


```
2. Get company API  (GET)

```bash
http get http://localhost/api/contacts/1/company

HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 160
Content-Type: application/json; charset=utf-8
Date: Thu, 10 Oct 2024 09:19:22 GMT
ETag: W/"a0-GkNpIjVsWSwZLAQacfzQVuWlduw"
Server: nginx/1.25.1
X-Powered-By: Express

{
  "company_id": 1,
  "company_name": "company 1",
  "company_address": "123 fake st",
  "contactId": 1,
  "createdAt": "2024-10-10T09:18:23.862Z",
  "updatedAt": "2024-10-10T09:18:23.862Z"
}


```
3. Delete company API (DELETE)

```bash

http delete http://localhost/api/contacts/1/company/1/
        
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 47
Content-Type: application/json; charset=utf-8
Date: Thu, 10 Oct 2024 09:37:08 GMT
ETag: W/"2f-goeWLYgQgcZh1o2QS0V4ovFdEa0"
Server: nginx/1.25.1
X-Powered-By: Express

{
  "message": "Company was deleted successfully!"
}


```

4. Edit company API (PUT)

```bash 

http put http://localhost/api/contacts/1/company/3

HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: close
Content-Length: 
Content-Type: application/json; charset=utf-8
Date: 
ETag: 
Server: nginx/1.25.1
X-Powered-By: Express

{
  "message": "Cannot update Company"
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

```
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
- In App.css: 
  ```
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
  .italic {
	  font-style: italic;
	  font-size: small;
	  margin-bottom: 10px;
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
```
```

## Task 4

1. Create a new table named 'companies':

```
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

```
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

```
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
```
/* Create database tables and models */
db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.phones = require("./phone.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize); ////
```

### app.js (api folder)

```
require("./routes/contacts.routes")(app);
require("./routes/phones.routes")(app);
require("./routes/stats.routes")(app);
require("./routes/company.routes")(app); ////
```

### Company routes

```
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

### 