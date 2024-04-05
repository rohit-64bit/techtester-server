const express = require('express');
const router = express.Router();

const Item = require('../models/Items');

router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ _id: -1 })
        res.json(items);
    } catch (error) {
        console.log(error)
        res.json({ error: 'Server Error' });
    }
});

router.post('/create', async (req, res) => {

    try {

        const { title, description, imgUrl } = req.body;

        if (!title || !description || !imgUrl) {
            return res.status(400).json({ error: 'Please enter all fields' });
        }

        const item = new Item({
            title,
            description,
            imgUrl
        });

        await item.save();

        res.json({ success: true, message: 'Item added successfully' });

    } catch (error) {

        console.log(error)
        res.json({ error: 'Server Error' });

    }

})

router.delete('/delete/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        await item.remove();

        res.json({ success: true, message: 'Item deleted successfully' });

    } catch (error) {
        console.log(error)
        res.json({ error: 'Server Error' });
    }
})

router.put('/update/:id', async (req, res) => {

    try {

        const { title, description, imgUrl } = req.body;

        const data = {}

        if (title) data.title = title;
        if (description) data.description = description;
        if (imgUrl) data.imgUrl = imgUrl;

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        await Item.findByIdAndUpdate(req.params.id, data, { new: true });

        res.json({ success: true, message: 'Item updated successfully' });

    } catch (error) {

        console.log(error)
        res.json({ error: 'Server Error' });

    }

})

module.exports = router;