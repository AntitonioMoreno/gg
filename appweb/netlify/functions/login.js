const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const accounts = require('../../models/account');

const uri = 'mongodb+srv://GGadmin:ZarzMAK2znmsnTyA@casino.owknlio.mongodb.net/casinoWeb';

exports.login = async (event, context) => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const { user, password } = JSON.parse(event.body);

        if (!user || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'falta usuario y/o contraseña' }),
            };
        }

        const account = await accounts.findOne({ user: user });

        if (!account) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'no se encontro al usuario' }),
            };
        }

        const bdPassword = account.password;

        bcrypt.compare(password, bdPassword).then((match) => {
            if (!match) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'usuario y/o contraseña incorrectos' }),
                };
            } else {
                const accessToken = createToken(account);
                res.cookie('access-token', accessToken, {
                    httpOnly: true,
                    maxAge: 86400000,
                    //path: '/profile',
                });
                //const setCookieHeader = res.getHeader('Set-Cookie');
                res.json({ redirectURL: '/profile' });
            }
        });

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'error interno del servidor' }),
        };
    }
};