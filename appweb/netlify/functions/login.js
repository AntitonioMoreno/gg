const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const accounts = require('../../models/account');
const { createToken } = require('./JWT'); // Assuming you use jwt to create tokens

const uri = 'mongodb+srv://GGadmin:ZarzMAK2znmsnTyA@casino.owknlio.mongodb.net/casinoWeb';

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
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
            await mongoose.disconnect();
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'no se encontro al usuario' }),
            };
        }

        const bdPassword = account.password;

        const match = await bcrypt.compare(password, bdPassword);
            if (!match) {
                await mongoose.disconnect();
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'usuario y/o contraseña incorrectos' }),
                };
            } else {
                const accessToken = createToken(account);
                await mongoose.disconnect();
                
                return {
                    statusCode: 200,
                    headers: {
                        'Set-Cookie' : `access-token=${accessToken}; HttpOnly; Max-Age=86400`,
                    },
                    body: JSON.stringify({ redirectURL: '/profile' }),
                };
            }

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'error interno del servidor' }),
        };
    }
};