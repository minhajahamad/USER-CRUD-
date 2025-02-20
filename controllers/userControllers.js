const User = require('../db/model/userSchema');

module.exports.getUser = async (req, res) => {
  try {
    const dbResponse = await User.find();
    res.status(200).json(dbResponse);
  } catch (e) {
    res.status(500).json({ message: e.messsage, error: true });
  }
};

module.exports.postUser = async (req, res) => {
  try {
    const { email, name, age } = req.body;
    const dbResponse = await User.create({ email, name, age });
    res.status(200).json({ message: 'User Added succesfully' });
  } catch (e) {
    res.status(500).json({ message: e.messsage, error: true });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const dbResponse = await User.findByIdAndUpdate(id, body);
    res.status(200).json({ message: 'User Updated succesfully' });
  } catch (e) {
    res.status(500).json({ message: e.messsage, error: true });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dbResponse = await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User Deleted Succesfully' });
  } catch (e) {
    res.status(500).json({ message: e.messsage, error: true });
  }
};
