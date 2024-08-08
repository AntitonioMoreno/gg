const mongoose = require('mongoose');
const accounts = require('../../models/account');
const validateToken = require('../functions/Auth'); // Adjust the path as needed

const uri = 'mongodb+srv://GGadmin:ZarzMAK2znmsnTyA@casino.owknlio.mongodb.net/casinoWeb';

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false; // Ensure the function doesn't wait for the event loop to be empty

    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Extract and validate the token
        const cookies = event.headers.cookie;
        if (!cookies) {
            console.error('No cookies found in headers');
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'No cookies found' }),
            };
        }

        const tokenCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('access-token='));
        if (!tokenCookie) {
            console.error('No access-token cookie found');
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'No access-token cookie found' }),
            };
        }

        const token = tokenCookie.split('=')[1];
        if (!token) {
            console.error('Access token is empty');
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Access token is empty' }),
            };
        }

        const user = await validateToken(token);
        if (!user) {
            console.error('Invalid token');
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Usuario no autenticado' }),
            };
        }

        // Find the account in the database
        const account = await accounts.findOne({ user: user.user });
        if (!account) {
            console.error('Usuario no encontrado');
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Usuario no encontrado' }),
            };
        }

        // Return the user account details
        return {
            statusCode: 200,
            body: JSON.stringify({
                user: account.user,
                email: account.email,
                name: account.name,
                // Add more fields as necessary
            }),
        };
    } catch (error) {
        console.error('Error during authentication:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error interno del servidor' }),
        };
    } finally {
        // Optionally, you can close the connection here
        // However, leaving the connection open might be more efficient for subsequent requests
        await mongoose.disconnect();
    }
};
