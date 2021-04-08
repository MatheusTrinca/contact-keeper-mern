const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const auth = require('../middlewares/auth');

// @route    GET /api/contacts
// @desc     Get user contacts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST /api/contacts
// @desc     Add new contact
// @access   Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT /api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const newContact = {};
  if (name) newContact.name = name;
  if (email) newContact.email = email;
  if (phone) newContact.phone = phone;
  if (type) newContact.type = type;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Not found' });
    }
    if (req.user.id !== contact.user.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: newContact },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE /api/contacts
// @desc     Delete contact
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Not found' });
    }
    if (req.user.id !== contact.user.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json();
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
