const mongoose = require('mongoose');
const accounts = require('../../models/account');
const validateToken = require('../functions/Auth'); // Adjust the path as needed

const uri = 'mongodb+srv://GGadmin:ZarzMAK2znmsnTyA@casino.owknlio.mongodb.net/casinoWeb';

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false; // Ensure the function doesn't wait for the event loop to be empty

    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Extract and validate the token
        const cookies = event.headers.cookie; // Get cookies from the headers
        const token = cookies
            .split(';')
            .find(cookie => cookie.trim().startsWith('access-token='))
            .split('=')[1]; // Extract the access-token

        const user = await validateToken(token);

        if (!user) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Usuario no autenticado' }),
            };
        }

        // Find the account in the database
        const account = await accounts.findOne({ user: user.user });
        
        if (!account) {
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
