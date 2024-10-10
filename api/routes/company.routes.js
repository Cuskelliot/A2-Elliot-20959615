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