// backend/controllers/itemController.js
const accounts = require('../models/accounts');
const bcrypt = require('bcryptjs');
const {createToken, validateToken} = require('../JWT');
const { decode } = require('jsonwebtoken');
const { signedCookie } = require('cookie-parser');
// Obtener todos los registros de una coleccion
exports.getItems = async (req, res) => {
  try {
    const items = await accounts.find();
    res.json(items);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Obtener un registro por su ID
exports.getItemById = async (req, res) => {
  try {
    const account = await accounts.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(account);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};


exports.login = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ error: 'Faltan datos de usuario o contraseña' });
    }

    const account = await accounts.findOne({ user: user });

    if (!account) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const bdPassword = account.password;

    bcrypt.compare(password, bdPassword).then((match) => {
      if (!match) {
        return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
      } else {
        const accessToken = createToken(account);
        res.cookie('access-token', accessToken, {
          httpOnly: true,
          maxAge: 3600000,
          //path: '/profile',
        });
        //const setCookieHeader = res.getHeader('Set-Cookie');
        res.json({redirectURL: '/profile'});
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.profile = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ error: 'Faltan datos de usuario o contraseña' });
    }
    const account = await accounts.findOne({ user: user});
    if (!account) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({
        user: account.user,
        email: account.email,
        name: account.name,
        // Agrega más campos según sea necesario
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
};

// Crear una nuevo registro
exports.createItem = async (req, res) => {
  try {
    const {
      name, lastName, email, user, password
    } = req.body;

    const existingUser = await accounts.findOne({ $or: [{ email: email }, { user: user }] });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario o email ya existen' });
    }
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const newAccount = new accounts({
      name: name,
      lastName: lastName,
      email: email,
      user: user,
      password: hash
    });
    await newAccount.save();
    res.json(newAccount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Actualizar una registro
exports.updateItem = async (req, res) => {
  try {
    const {
      user, password
    } = req.body;
    const updatedAccount = await accounts.findByIdAndUpdate(
      req.params.id,
      {
        user, password
      },
      { new: true }
    );
    if (!updatedAccount) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json(updatedAccount);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// Eliminar un registro
exports.deleteItem = async (req, res) => {
  try {
    const deletedAccount = await accounts.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    res.json({ mensaje: 'Registro eliminada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};