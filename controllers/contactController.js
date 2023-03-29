const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res, next) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res, next) => {
    console.log("hey");
    console.log(req.body);
    const { name, email, phno } = req.body
    if (!name || !email || !phno) {
        res.status(400)
        throw new Error("all feilds are manditory")
    }
    const contact = await Contact.create({
        name,
        email,
        phno,
        user_id: req.user.id
    })
    
    res.status(201).json(contact);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res, next) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error("contact not found")
    }
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async function (req, res, next) {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error("contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update other user contacts")
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updateContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async function (req, res, next) {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error("contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to delete other user contacts")
    }
    await Contact.deleteOne({_id: req.params.id})()
    res.status(200).json(contact)
});

module.exports = {
    getContact,
    createContact,
    deleteContact,
    getContacts,
    updateContact
}