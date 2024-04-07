const express = require('express');
const Contact = require('../models/ContactForm');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = express.Router();

router.get('/',verifyAdmin,async (req,res) => {
    try{
        const data = await Contact.find().sort({createdAt:-1});
        res.status(200).json({success: true,data});
    
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})
router.post('/create', async (req,res) => {
    try{
        const {name,email,query,contactNo,status} = req.body;
        if(!name || !email || !query || !contactNo ||!status){
            return res.status(400).json({
                error: 'Please enter all fields'
            });
        }
        await Contact.create({name,email,query,contactNo,stts})
        res.status(201).json({success: true,message: "Contact added"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})
router.put('/update/:id',verifyAdmin, async (req,res) => {
    try{
        const {name,email,query,contactNo,status} = req.body;
        let data = {};
        const validateContact = await Contact.findById(req.params.id);
        if (!validateContact) {
            return res.status(404).json({error: 'Contact not found'});
        }
        if (name) data.name = name;
        if (email) data.email = email;
        if (query) data.query = query;
        if (contactNo) data.contactNo = contactNo;
        if (status) data.status = status;
        const contact = await Contact.findByIdAndUpdate(req.params.id, data, { new: true });
        res.status(200).json({success: true,message: "Contact updated",data: contact});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})
router.delete('/delete/:id',verifyAdmin, async (req,res) => {
    try{
        const validateContact = await Contact.findById(req.params.id);
        if (!validateContact) {
            return res.status(404).json({ error: 'Contact not found'});
        }
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true,message: "Contact deleted"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})
module.exports = router;