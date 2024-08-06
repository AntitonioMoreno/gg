// netlify/functions/createItem.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Account = require('../../../models/account'); // Asegúrate de usar la ruta correcta

const uri = 'mongodb+srv://GGadmin:ZarzMAK2znmsnTyA@casino.owknlio.mongodb.net/casinoWeb'; // Reemplaza con tu cadena de conexión de MongoDB

exports.register = async (event, context) => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const { name, lastName, email, user, password } = JSON.parse(event.body);

    const existingUser = await Account.findOne({ $or: [{ email: email }, { user: user }] });
    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'El usuario o email ya existen' }),
      };
    }

    const hash = await bcrypt.hash(password, 10);
    console.log(hash);

    const newAccount = new Account({
      name: name,
      lastName: lastName,
      email: email,
      user: user,
      password: hash,
    });

    await newAccount.save();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // o especifica tu dominio
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify(newAccount),
    };
  } catch (error) {
    console.error(error.message);
    return {
      statusCode: 500,
      body: 'Error del servidor',
    };
  } finally {
    mongoose.connection.close();
  }
};
