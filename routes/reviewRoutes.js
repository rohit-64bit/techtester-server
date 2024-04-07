const express = require('express');
const Review = require('../models/Review');
const verifyAdmin = require('../middlewares/verifyAdmin');
const router = express.Router();

router.get('/', verifyAdmin, async (req, res) => {

    try {
        const data = await Review.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

})

router.post('/create', async (req, res) => {

    try {
        const { name, feedback, rating, agentID } = req.body;
        if (!name || !feedback || !rating || !agentID) {
            return res.status(400).json({
                error: 'Please enter all fields'
            });
        }
        await Review.create({ name, feedback, rating: Number(rating), agentID })
        res.status(201).json({ success: true, message: "Review added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

})

router.put('/update/:id', async (req, res) => {

    try {

        const { name, feedback, rating, agentID } = req.body;

        let data = {};

        const validateReview = await Review.findById(req.params.id);

        if (!validateReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        if (name) data.name = name;
        if (feedback) data.feedback = feedback;
        if (rating) data.rating = rating;
        if (agentID) data.agentID = agentID;

        const review = await Review.findByIdAndUpdate(req.params.id, data, { new: true });
        res.status(200).json({ success: true, message: "Review updated", data: review });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

})

router.delete('/delete/:id', verifyAdmin, async (req, res) => {

    try {

        const validateReview = await Review.findById(req.params.id);

        if (!validateReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "Review deleted" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

})

router.get('/user', async (req, res) => {

    try {
        const data = await Review.find({
            rating: { $gte: 3 }
        }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

})

module.exports = router;