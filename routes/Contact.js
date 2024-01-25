const express = require('express');
const router = express.Router()
const { saveContact, getContact, getSingleContact, searchContact, updateContact, deleteContact } = require('../controllers/Contact');

//Post functionality - Save Contact
router.post('/contact', saveContact)

//Get Functionality - Get All Contact
router.get('/contact', getContact)

//Get Functionality - Get a Single Contact by ID
router.get('/contact/:id', getSingleContact)

//Search Functionality - Get a contact based on critiria
router.get('/search', searchContact)

//Update Functionality - Update a contact
router.put('/contact/:id', updateContact)

//Delete Functionality - Delete a Contact 
router.delete('/contact/:id', deleteContact)


module.exports = router;