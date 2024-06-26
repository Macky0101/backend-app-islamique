const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { identifiant, mot_de_passe } = req.body;
    try {
      const admin = await Admin.findOne({ identifiant });
      if (!admin) {
        console.log('Admin not found');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(mot_de_passe, admin.mot_de_passe);
      if (!isMatch) {
        console.log('Password does not match');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
      res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.createAdmin = async (req, res) => {
    const { identifiant, mot_de_passe, role } = req.body;
    try {
      let admin = await Admin.findOne({ identifiant });
      if (admin) return res.status(400).json({ message: 'Admin already exists' });
  
      admin = new Admin({ identifiant, mot_de_passe, role });
      await admin.save();
      res.json({ message: 'Admin created successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-mot_de_passe');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
