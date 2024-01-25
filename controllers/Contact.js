const express = require('express');
const router = express.Router()
const Contact = require('../models/Contact')



//Create Functionality
const saveContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save().then((newContact) => {
            console.log(newContact)
            res.status(200).json({ msg: 'Contact saved successfully' })
        }).catch(error => {
            console.log(error)

            if (error.code === 11000 && error.keyPattern && error.keyPattern.emailAddress) {
                res.status(500).json({ msg: 'Email address already exist' })
            } else {
                res.status(500).json({ msg: 'Cannot save contact... An error occured' })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Unable to save contact" })
    }
}

//Get Contacts Functionality
const getContact = async (req, res) => {
    try {
        await Contact.find().then(contact => {
            console.log(contact);
            res.status(200).json({ contact: contact })
        }).catch((error) => {
            console.log(error)
            res.status(500).json({ msg: 'Unable to get contact' })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Unable to retrive contact' })
    }
}
//Get Single Contact Functionality
const getSingleContact = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.findById(id).then(contact => {
            console.log(contact)
            res.status(200).json({ contact: contact })
        }).catch((error) => {
            console.log(error)
            res.status(500).json({ msg: "An error occured while trying to retrive contact" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Unable to get contact' })
    }
}

//Search Contacts Functionality
const searchContact = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const searchRegExp = new RegExp(searchTerm, 'i')
        await Contact.find({
            $or: [
                { firstName: searchRegExp },
                { lastName: searchRegExp },
                { emailAddress: searchRegExp }
            ]
        }).then((matchingRecord) => {
            console.log(matchingRecord)
            if (matchingRecord.length) {
                res.status(200).json({ contact: matchingRecord })
            } else {
                res.status(200).json({ contact: [], msg: 'No record found' })
            }
        }).catch((error) => {
            console.log(error)
            res.status(500).json({ msg: 'Unable to find matching record' })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'No matching record found' })
    }
}

//Update Contact Functionality
const updateContact = async (req, res) => {
    try {
        const id = req.params.id;
        const updateContact = req.body;
        await Contact.findOneAndUpdate({ _id: id }, updateContact, { new: true })
            .then((updatedContact) => {
                console.log(updatedContact)
                res.status(200).json({ msg: 'Contact updated successfully', contact: updatedContact })
            }).catch((error) => {
                console.log(error)
                res.status(500).json({ msg: 'Unable to update contact' })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Unable to update contact' })
    }
}

//Delete Contact Functionality
const deleteContact = async (req, res) => {
    try {
        const id = req.params.id
        await Contact.findByIdAndDelete(id)
            .then((deletedContact) => {
                console.log(deletedContact)
                res.status(200).json({ msg: 'Contact deleted successfully', contact: deletedContact })
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({ msg: 'Unable to deleted contact' })
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Unable to delete contact' })
    }
}

module.exports = { saveContact, getContact, getSingleContact, searchContact, updateContact, deleteContact }