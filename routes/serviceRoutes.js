const express = require('express');
const Service = require('../models/Service');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const data = await Service.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data
        })

    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });

    }

});

router.post('/create', verifyAdmin, async (req, res) => {

    try {

        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                error: 'Please enter all fields'
            });
        }

        await Service.create({
            title,
            description
        });

        res.status(201).json({
            success: true,
            message: "Service added"
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });

    }

})

router.put('/update/:id', verifyAdmin, async (req, res) => {

    try {

        const { title, description } = req.body;

        let data = {};

        const validateService = await Service.findById(req.params.id);

        if (!validateService) {
            return res.status(404).json({
                error: 'Service not found'
            });
        }

        if (title) data.title = title;
        if (description) data.description = description;

        const service = await Service.findByIdAndUpdate(req.params.id, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Service updated",
            data: service
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });

    }
})

router.delete('/delete/:id', verifyAdmin, async (req, res) => {

    try {

        const validateService = await Service.findById(req.params.id);

        if (!validateService) {
            return res.status(404).json({
                error: 'Service not found'
            });
        }

        await Service.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Service deleted"
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        });

    }

})

module.exports = router;