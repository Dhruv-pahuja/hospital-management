const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.register = async (req, res) => {
    const { email, name, password, role } = req.body;
    
    if (role !== 'patient') {
        return res.status(403).json({ message: 'Only patients can sign up' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, name, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
